import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from '../context/auth.context.jsx'
import App from './App.jsx'
import { InterviewProvider } from './interview/services/interview.context.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InterviewProvider>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
      </AuthProvider>
      </InterviewProvider>
  </BrowserRouter>,
);
