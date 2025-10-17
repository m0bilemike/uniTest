declare global {
  namespace JSX {
    type Element = React.JSX.Element;
  }
}
export interface PicsumImage {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
  url: string;
}
