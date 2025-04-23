import { useNavigate, Link } from 'react-router-dom';
import facebookIcon from '../assets/icons/footer1.png';
import twitterIcon from '../assets/icons/footer2.png';
import linkedinIcon from '../assets/icons/footer3.png'
import '../App.css';
 
const IntroPage = () => {
  const navigate = useNavigate();
 
  return (
    <div id="home">
      <div>
        <div className="intro-header">
          <div className="header-left">
            <img src="/images/logo1.png" alt="Logo" className="logo" />
            <span className="logo-text">VeriCODE</span>
          </div>
          <div className="header-right">
            <button className="signup-btn" onClick={() => navigate('/signup')}>
              Signup
            </button>
          </div>
      </div>
 
        <div className="intro-container">
          <h1 className="fade-in">
          <span style={{ color: '#F0FFFF', fontWeight: 600 }}>Empowering Developers with AI-Powered Intelligence{' '}</span><br></br>
         
            <span style={{ color: '#F08080', fontWeight: 600 }}>Code Reviewer.</span>
          </h1>
          <p className="fade-in">Analyze your code for bugs and get documentation with AI.</p>
          <button className="start-btn" onClick={() => navigate('/index')}>
            Start Code Review ➔
          </button>
          <section className="feature-section" id="features">
            <div className="card-container">
              <div className="feature-card">
                <h3>🔍 Bug Detection</h3>
                <p>Automatically detect bugs and issues across your codebase using AI models.</p>
              </div>
              <div className="feature-card">
                <h3>🚀 Optimization</h3>
                <p>Get performance improvement suggestions and cleaner code refactoring.</p>
              </div>
              <div className="feature-card">
                <h3>📄 Documentation</h3>
                <p>Generate clear, concise, and structured documentation for your project automatically.</p>
              </div>
              {/* <div className="feature-card">
                <h3>✅ Standard Compliance</h3>
                <p>Ensure your code adheres to coding standards of respective languages.</p>
              </div>
              <div className="feature-card">
                <h3>🛡️ Security Analysis</h3>
                <p>Scan for security vulnerabilities and any data or memory leaks in your code.</p>
              </div>
              <div className="feature-card">
                <h3>📘 Docstring Generation</h3>
                <p>Generate docstrings automatically for functions and classes.</p>
              </div> */}
              <div className="feature-card">
                <h3>🧪 Unit Test Suggestions</h3>
                <p>Get intelligent suggestions for writing unit tests for your code.</p>
              </div>
            </div>
          </section>
        </div>
 
        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>For any inquiries, please feel free to reach to us......</p>
 
          <form className="contact-form">
            <input type="text" placeholder="Your Name" disabled />
            <input type="email" placeholder="Your Email" disabled />
            <textarea placeholder="Your Message" disabled />
            <button type="submit" disabled>Send</button>
          </form>
        </section>
 
        <footer className="footer">
          <div className="footer-section">
            <h3>About VeriCode</h3>
            <p>AI-powered code analysis platform.</p>
          </div>
 
          <div className="footer-section">
            <h3>Quick Links</h3>
              <a href="#home">Home</a><br />
              <a href="#contact">Contact</a><br />
              <a href="#features">Features</a>
          </div>
 
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="Linkedin" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            © 2025 VeriCode. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};
export default IntroPage;