import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { register } from '@utils/serviceWorkerRegistration';
import * as C from '@styles/commonStyle.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <C.Page>
      <C.Container>
        <App />
      </C.Container>
    </C.Page>
  </StrictMode>,
);

register();
