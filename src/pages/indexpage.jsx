import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
 
const IndexPage = () => {
  const [githubURL, setGithubURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [repoTree, setRepoTree] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
 
  const handleAnalyze = async () => {
    if (!githubURL && files.length === 0 && selectedFiles.length === 0) {
      alert("Please provide a GitHub URL, upload files, or select repo files.");
      return;
    }
    setLoading(true);
 
    const formData = new FormData();
 
    if (githubURL) {
      formData.append("repo_url", githubURL);
    }
 
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    }
 
    try {
      if (selectedFiles.length > 0) {
        const response = await axios.post("http://127.0.0.1:5000/analyze_selected", {
          file_urls: selectedFiles,
        });
 
        if (response.data.success) {
          navigate("/review");
        } else {
          throw new Error(response.data.error || "Analysis failed.");
        }
      } else {
        const response = await axios.post("http://127.0.0.1:5000/submit", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
 
        if (response.data.success) {
          sessionStorage.setItem("githubURL", githubURL);
          sessionStorage.setItem("uploadedFiles", JSON.stringify([...files].map(f => f.name)));
          navigate("/review");
        } else {
          throw new Error(response.data.error || "Failed to analyze code.");
        }
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Analysis Error:", err);
    }
  };
 
  const buildFileTree = (files) => {
    const tree = {};
 
    files.forEach(file => {
      const parts = file.path.split('/');
      let current = tree;
      parts.forEach((part, i) => {
        if (!current[part]) {
          current[part] = i === parts.length - 1 ? { ...file, __isFile: true } : {};
        }
        current = current[part];
      });
    });
    return tree;
  };
 
  const renderTree = (node, path = '') => {
    return Object.entries(node).map(([name, value]) => {
      const fullPath = path ? `${path}/${name}` : name;
      if (value.__isFile) {
        return (
          <li key={fullPath}>
            <input
              type="checkbox"
              value={value.download_url}
              checked={selectedFiles.includes(value.download_url)}
              onChange={() => toggleFileSelection(value.download_url)}
              className="file-checkbox"
            />
            <a href={value.html_url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </li>
        );
      } else {
        return (
          <li key={fullPath}>
            <span role="img" aria-label="folder">
</span> <strong>{name}</strong>
            <ul style={{ marginLeft: '10px' }}>{renderTree(value, fullPath)}</ul>
          </li>
        );
      }
    });
  };
 
  const fetchRepoFiles = async () => {
    const cleanURL = githubURL.trim().replace(/\.git$/, '');
    const match = cleanURL.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/);
 
    if (!match) {
      alert("Invalid GitHub repository URL.");
      return;
    }
 
    const [_, owner, repo] = match;
    const apiURL = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
 
    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("GitHub API failed");
 
      const data = await response.json();
      const fileData = data.tree.filter(item => item.type === 'blob').map(item => ({
        path: item.path,
        name: item.path.split('/').pop(),
        html_url: `https://github.com/${owner}/${repo}/blob/main/${item.path}`,
        download_url: `https://raw.githubusercontent.com/${owner}/${repo}/main/${item.path}`
      }));
 
      const tree = buildFileTree(fileData);
      setRepoTree(tree);
    } catch (error) {
      console.error("Error fetching repo files:", error.message);
      alert("Failed to fetch files. Ensure the GitHub repo is public.");
    }
  };
 
  const toggleFileSelection = (url) => {
    setSelectedFiles(prev =>
      prev.includes(url)
        ? prev.filter(u => u !== url)
        : [...prev, url]
    );
  };
 
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };
 
  return (
    <div className="index-background">
      <div className="logo-group">
        <img src="/images/logo1.png" alt="Logo" className="logo" />
        <span className="logo-text">VeriCODE</span>
      </div>
 
      <div className="top-right-nav">
        <a href="/"><FontAwesomeIcon icon={faHome} color="black" title="Home" /></a>
        <button onClick={toggleDarkMode} className="nav-link">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} title="DarkMode" className="toggle-icon" />
        </button>
        <a href="https://github.com/" target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faGithub} color="black" title="GitHub" />
        </a>
        <a href='/config' title='Configure Code Review'>
</a>
      </div>
 
      <main className="container">
        <section className="intro-section">
          <h2>Welcome to AI Code Reviewer</h2>
          <p>Analyze your code with AI-powered insights. Detect issues, optimize performance, and generate documentation effortlessly.</p>
        </section>
 
        <section className="upload-section">
          <h2>Get Started</h2>
          <div className="input-button-group">
            <input
              type="text"
              placeholder="Enter GitHub Repo URL"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
            />
            <button onClick={fetchRepoFiles}> show files </button>

          </div>
 
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
 
          <div style={{ margin: '10px 0' }}></div>
 
          {loading ? (
            <div className="progress mt-3" role="progressbar" aria-label="Analyzing..." aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>
                Analyzing...
              </div>
            </div>
          ) : (
            <button onClick={handleAnalyze}>
              Analyze
            </button>
          )}
 
          {Object.keys(repoTree).length > 0 && (
              <div className="file-list-container">
                <div className=''></div>   
              <h3>Files in Repository</h3>          
              <ul>
                {renderTree(repoTree)}
              </ul>
            </div>
            
          )}
        </section>
      </main>
    </div>
  );
};
 
export default IndexPage;
 