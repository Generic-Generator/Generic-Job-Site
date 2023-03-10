import React, {lazy} from 'react';
import { createRoot } from 'react-dom/client';
const App = lazy(() => import('./App.jsx'));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);