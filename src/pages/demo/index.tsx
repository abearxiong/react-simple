import { Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
const Demo = () => {
  const { t, i18n } = useTranslation('general');
  const changeLanguage = () => {
    const i = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(i);
    console.log('changeLanguage', i);
    console.error('changeLanguage', i);
    throw '123';
  };
  return (
    <div>
      <div>demo==={t('demo')}</div>
      <Button type='primary' onClick={changeLanguage}>
        Button
      </Button>
    </div>
  );
};
export const DemoRoute = () => {
  return (
    <Routes>
      <Route index element={<Demo />}></Route>
    </Routes>
  );
};
