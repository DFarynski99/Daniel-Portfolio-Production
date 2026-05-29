import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

document.documentElement.dataset.concept = 'editorial'

createRoot(document.getElementById("root")!).render(<App />);
