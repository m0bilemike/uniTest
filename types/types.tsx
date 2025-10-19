declare global {
  namespace JSX {
    type Element = React.JSX.Element;
  }
}
export interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  liked?: boolean;
}
