declare module "*.module.css";
declare module "*.module.scss";

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "react-lazy-media";
declare module "react-helmet";
