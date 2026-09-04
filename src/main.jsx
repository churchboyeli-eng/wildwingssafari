import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const initialDataElement = document.getElementById('wild-wings-data');
let initialData = null;
if (initialDataElement?.textContent) {
  try {
    initialData = JSON.parse(initialDataElement.textContent);
  } catch {
    initialData = null;
  }
}
const application = (
  <StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
