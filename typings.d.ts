type SimpleObject = {
  [key: string | number]: any;
};

declare const WEBPACK_SERVE: boolean;
declare module '*.css';
// declare module '*.scss';

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '@mui/material/styles' {
  const createTheme: any;
  const ThemeProvider: any;
  type ThemeOptions = any;
}

declare let __webpack_init_sharing__;
declare let __webpack_share_scopes__;
declare let DEV_SERVER: boolean;
