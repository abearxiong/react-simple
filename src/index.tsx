import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <>
      <h1>简单的react + typescript写法</h1>
      <h2>只包含必要可以跑起来的功</h2>
    </>
  );
};
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

