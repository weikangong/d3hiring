export default class ApiError extends Error {
    private code: number;

    private msg: string;

    constructor(message: string, code: number) {
      super(message);
      this.msg = message;
      this.code = code;
    }
}
