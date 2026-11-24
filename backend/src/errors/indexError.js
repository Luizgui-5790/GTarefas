export class AppError extends Error {
    constructor(messagem, statusCode = 400) {
        super(messagem);
        this.statusCode = statusCode;
        this.name = new.target.name;
    }
}
