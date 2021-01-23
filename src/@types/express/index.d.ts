declare namespace Express {
  export interface Request {
    token?: string;
    query: {
      search?: string;
      rcNumber?: string;
    };
  }
}
