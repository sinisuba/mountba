import './bootstrap';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('app'));
root.render(<App />);
