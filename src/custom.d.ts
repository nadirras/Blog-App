type Author = {
  id: number;
  isAuthor: boolean;
};

declare namespace Express {
  export interface Request {
    author?: Author;
  }
}
