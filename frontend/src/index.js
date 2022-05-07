import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>

);