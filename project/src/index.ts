import { createRoot } from 'react-dom/client';
import { App } from './App';

const base = document.createElement('div');

document.body.appendChild(base);

const root = createRoot(base);

root.render(App());
