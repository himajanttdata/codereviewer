import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-solid-svg-icons';

const ReviewPage = () => {
  const navigate = useNavigate();
  const [githubURL, setGithubURL] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reviewSections, setReviewSections] = useState({});/*--------change done*/
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/review2")
  .then((res) => {
    setReviewSections(res.data);
  })
  .catch((err) => {
    console.error("Error fetching review:", err);
  });
      
      
  }, []);

  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll("pre");
      codeBlocks.forEach((block) => {
        if (!block.querySelector(".copy-btn")) {
          const button = document.createElement("button");
          const icon = document.createElement("i");
          icon.className = {faClone}
          button.textContent = "Copy";
          button.className = "copy-btn";
          button.style.position = "absolute";
          button.style.top = "10px";
          button.style.right = "30px";
          button.style.padding = "4px 8px";
          button.style.cursor = "pointer";
          button.style.zIndex = "2";
          button.style.background = "transparent";
          button.style.color = "#000";
          button.style.border = "1px solid #ccc";
          button.style.borderRadius = "4px";
          
          // const wrapper = document.createElement("div");
          // wrapper.style.position = "relative";
          // block.parentNode.insertBefore(wrapper, block);
          // wrapper.appendChild(block);
          // wrapper.appendChild(button);
          block.style.position = "relative"

          button.onclick = () => {
            navigator.clipboard.writeText(block.innerText).then(() => {
              button.textContent = "Copied!";
              setTimeout(() => (button.textContent = "Copy"), 2000);
            });
          };
          block.appendChild(button);
          button.appendChild(icon)
        }
      });
    };

    setTimeout(addCopyButtons, 100); // wait a little to ensure DOM is updated
  }, [reviewSections]);

  // const downloadDocxReport = () => {
  //   axios.get("http://localhost:5000/download_docx", {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       if (!response.ok) throw new Error("Download failed");
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "VeriCODE_Review_Report.docx");
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //     })
  //     .catch((err) => {
  //       alert("Error downloading report: " + err.message);
  //     });
  // };
  const downloadDocxReport = () => {
    axios({
      url: "http://localhost:5000/download_docx",
      method: "GET",
      responseType: "blob", //  this tells Axios to treat it as a binary file
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "VeriCODE_Review_Report.docx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.error("Error downloading report:", err.message);
        alert("Error downloading report: " + err.message);
      });
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };
  

  return (
    <div className = "review-background">
      <div>
        <div className="logo-group">
          <img src="/images/logo1.png" alt="Logo" className="logo" />
          <span className="logo-text">VeriCODE</span>
        </div>

        <div className="top-right-nav">
          <a href="/index"> <FontAwesomeIcon icon={faHome} color="black" title="Home"/></a>
          <button onClick={toggleDarkMode} className="nav-link">
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} title="DarkMode" className="toggle-icon" />
          </button>
          <a href="https://github.com/" target='_blank' rel='noopener noreferrer'> <FontAwesomeIcon icon={faGithub} color="black" title="GitHub"/></a>
          {/* <button onClick={() => navigate('/')}> Logout</button> */}
          <button onClick={() => navigate('/')} title="SignOut" >
              <FontAwesomeIcon icon={faSignOutAlt}/>
          </button>
        </div>

        <header>
          <h1>Code Review Results</h1>
        </header>

        <main className="review-container">
          {Object.entries(reviewSections).map(([key, section]) => (
            <section className="section" key={key}>
              <h2>{section.title}</h2>
              <div className="box">
                <div dangerouslySetInnerHTML={{ __html: section.body }} />
              </div>
            </section>
          ))}

          <button className="download-button" onClick={downloadDocxReport}>⬇️ Download Report</button>
          {/* <button className="back-button" onClick={() => navigate('/')}>Back to Home</button> */}
        </main>
      </div>
    </div>
  );
};

export default ReviewPage;


  /*useEffect(() => {
    fetch("http://127.0.0.1:5000/review2")
      .then((res) => res.json())
      .then((data) => {
        console.log("Review sections:", data); // process response here
      })
      .catch((err) => {
        console.error("Failed to fetch review:", err);
      });
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
      sidebar.style.left = "-250px";
    } else {
      sidebar.style.left = "0px";
    }
  };

  const downloadReviewReport = () => {
    alert("Downloading simulated review report... (This would generate a .docx)");
  };

    const downloadDocxReport = () => {
      fetch("http://127.0.0.1:5000/download_docx", {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Download failed");
    
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "VeriCODE_Review_Report.docx");
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((err) => {
          alert("Error downloading report: " + err.message);
        });
    };

  {Object.entries(reviewSections).map(([key, section]) => (
    <section className="section" key={key}>
      <h2>{section.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: section.body }} />
    </section>
  ))}
  
  return (
    <div>
      <div className="intro-header">
        <img src="/images/logo1.png" alt="Logo" className="logo" />
        <span className="logo-text">VeriCODE</span>
      </div>

      <div className="top-right-nav">
        <a href="/">🏠 Home</a>
        <button onClick={() => document.body.classList.toggle('dark-mode')}>
          🌓 Toggle Mode
        </button>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          🐙 GitHub
        </a>
        <button onClick={() => navigate('/')}>🚪 Logout</button>
      </div>

      <header>
        <h1>Code Review Results</h1>
      </header>

      <main className="review-container">
        <section className="section">
          <h2>📊 Quality Analysis</h2>
          <ul>
            <li>No issues detected.</li>
          </ul>
        </section>

        <section className="section">
          <h2>🪲 Bug Detection</h2>
          <ul>
            <li>No issues detected.</li>
          </ul>
        </section>

        <section className="section">
          <h2>🚀 Optimization Suggestions</h2>
          <ul>
            <li>No optimizations available.</li>
          </ul>
        </section>

        <section className="section">
          <h2>🔧 Final Updated Code (Reframed Code)</h2>
          <p>No documentation generated.</p>
        </section>

        <section className="section">
          <h2>📄 Auto-Generated Documentation</h2>
          <ul>
            <li>No suggestions available.</li>
          </ul>
        </section>

        <section className="section">
          <h2>📝 Summary</h2>
          <ul>
            <li>No suggestions available.</li>
          </ul>
        </section>

        <section className="section">
          <h2>✅ Conclusion</h2>
          <ul>
            <li>No suggestions available.</li>
          </ul>
        </section>

        <button className="download-button" onClick={downloadDocxReport}>⬇️ Download Report</button>
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </main>
    </div>
  );
};

export default ReviewPage;*/


