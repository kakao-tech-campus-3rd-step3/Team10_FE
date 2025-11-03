declare module 'html-to-image' {
  export interface Options {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    imagePlaceholder?: string;
    fontEmbedCSS?: string;
    cacheBust?: boolean;
    includeQueryParams?: boolean;
  }

  export function toPng(node: HTMLElement, options?: Options): Promise<string>;
  export function toJpeg(node: HTMLElement, options?: Options): Promise<string>;
  export function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
  export function toPixelData(node: HTMLElement, options?: Options): Promise<ImageData>;
  export function toSvg(node: HTMLElement, options?: Options): Promise<string>;
  export function toCanvas(node: HTMLElement, options?: Options): Promise<HTMLCanvasElement>;
}
