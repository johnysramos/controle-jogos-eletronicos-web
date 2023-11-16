export class AppError extends Error {
  status = 0;

  constructor(message: string) {
    super(message);
  }
}
