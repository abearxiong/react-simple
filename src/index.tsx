import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initI18n } from './i18n';
const main = async () => {
  await initI18n();
  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
};

main();
