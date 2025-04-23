import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
 
const ConfigurationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('default');
  const [defaultCreds, setDefaultCreds] = useState({
    azureKey: '',
    azureEndpoint: '',
    azureDeployment: '',
    azureApiVersion: ''
  });
 
  const [inputCreds, setInputCreds] = useState({
    azureKey: '',
    azureEndpoint: '',
    azureDeployment: '',
    azureApiVersion: ''
  });
 
  useEffect(() => {
    const stored = localStorage.getItem('vericode-azure');
    if (stored) setDefaultCreds(JSON.parse(stored));
  }, []);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputCreds(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = () => {
    if (!inputCreds.azureKey || !inputCreds.azureEndpoint || !inputCreds.azureDeployment || !inputCreds.azureApiVersion) {
      alert("⚠️ All Azure fields must be filled.");
      return;
    }
    localStorage.setItem('vericode-azure', JSON.stringify(inputCreds));
    setDefaultCreds(inputCreds);
    setInputCreds({
      azureKey: '',
      azureEndpoint: '',
      azureDeployment: '',
      azureApiVersion: ''
    });
    setActiveTab('default');
  };
 
  return (
      <div className="config-page-wrapper">
        <div className="container config-container">
          <div  
            className="global-exit-button"
            onClick={() => navigate('/index')}
            title="Back to Analyze"
          >
            🗙
          </div>
          <div className="logo-group">
            <img src="/images/logo1.png" alt="Logo" className="logo" />
            <span className="logo-text">VeriCODE</span>
          </div>

          <h2 className="config-title">⚙️Configuration</h2>
 
          <div className="tab-buttons">
            <button className={activeTab === 'default' ? 'active' : ''} onClick={() => setActiveTab('default')}>
              Default
            </button>
            <button className={activeTab === 'custom' ? 'active' : ''} onClick={() => setActiveTab('custom')}>
              Own Credentials
            </button>
          </div>
 
          {activeTab === 'default' && (
            <div className="config-section">
              <h3>🔒Default (Saved)</h3>
              <div className='input-row'>
              <label className='labels'>Azure key : </label>
              <input type="text" value={defaultCreds.azureKey?`************${defaultCreds.azureKey.slice(-4)}` : ''} placeholder="Azure Key" disabled title='Masked For Security' className='textbox'/><br></br>
              </div>
              <div className='input-row'>
              <label className='labels'>Azure Endpoint : </label>
              <input type="text" value={defaultCreds.azureEndpoint?`********${defaultCreds.azureEndpoint.slice(-10)}` : ''} placeholder="Azure Endpoint" disabled title='Masked For Security' className='textbox'/><br></br> 
              </div>              
              <div className='input-row'>
              <label className='labels'>Azure Deployment : </label>
              <input type="text" value={defaultCreds.azureDeployment?`******${defaultCreds.azureDeployment.slice(-4)}` : ''} placeholder="Azure Deployment" disabled title='Masked For Security' className='textbox'/><br></br>
              </div>             
              <div className='input-row'>
              <label className='labels'>Azure Api Version : </label>
              <input type="text" value={defaultCreds.azureApiVersion?`****${defaultCreds.azureApiVersion.slice(-2)}` : ''} placeholder="Azure API Version" disabled title='Masked For Security' className='textbox' /><br></br>
              </div>    
              <button className="input-button" onClick={() => {
                alert("Proceeding with default Credentials");
                navigate('/index');
              }}>
                🚀Use Default and Continue
              </button>
            </div>
          )}
 
          {activeTab === 'custom' && (
            <div className="config-section">
              <h3>🔐Enter Your Azure Credentials</h3>
              <div>
              <label className='labels'>Azure Key : </label>
              <input
                type="text"
                name="azureKey"
                placeholder="Enter Azure Key"
                value={inputCreds.azureKey}
                onChange={handleInputChange}
              /><br></br>
              </div>
              <div>
                <label className='labels'>Azure Endpoint : </label>
                <input
                type="text"
                name="azureEndpoint"
                placeholder="Enter Azure Endpoint"
                value={inputCreds.azureEndpoint}
                onChange={handleInputChange}
              /><br></br>
              </div>
              <div>
                <label className='labels'>Azure Deployment : </label>
                <input
                type="text"
                name="azureDeployment"
                placeholder="Enter Azure Deployment Name"
                value={inputCreds.azureDeployment}
                onChange={handleInputChange}
              /><br></br>
              </div>
              <div>
                <label className='labels'>Azure API Version : </label>
                <input
                type="text"
                name="azureApiVersion"
                placeholder="Enter Azure API Version"
                value={inputCreds.azureApiVersion}
                onChange={handleInputChange}
              /><br></br>
              </div>
              
              <button className="input-button" onClick={handleSubmit}>Submit and Continue</button>
            </div>
          )}
        </div>
      </div>
  );
};
 
export default ConfigurationPage;