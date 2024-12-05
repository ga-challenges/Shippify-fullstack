export default class DriverNotFoundError extends Error {
    constructor(message: string = 'The specified driver does not exist.') {
        super(message);
    }
}
