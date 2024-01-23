import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/tailwindcss/tailwind.css';
import './app.scss';
import { DemoRoute } from './pages/demo';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/demo/*' element={<DemoRoute />} />
      </Routes>
    </Router>
  );
};
