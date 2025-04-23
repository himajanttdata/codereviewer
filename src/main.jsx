import React from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import process from 'process';
//import './index.css';
import App from './App';

window.Buffer = Buffer;
window.process = process;
 
 
const container = document.getElementById('root')
 
 
const root = createRoot(container);
root.render(<App />);
