export type AppError = Error & {
  code?: number;
};

export const sendError = (msg: string, code?: number ): never => {
  const err = new Error(msg) as AppError;
  if (code) {
    err.code = code;
  }
  throw err;
};
