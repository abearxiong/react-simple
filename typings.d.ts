type SimpleObject = {
  [key: string | number]: any;
};

declare const WEBPACK_SERVE: boolean;
declare module '*.css';
declare module '*.scss';

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
