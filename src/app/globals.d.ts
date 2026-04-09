declare module '*.css' {
  interface CSSModule {
    [className: string]: string;
  }
  const css: CSSModule;
  export default css;
}
