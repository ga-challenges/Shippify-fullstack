export default class CompanyNotFoundError extends Error {
    constructor(message: string = 'The specified company does not exist.') {
        super(message);
    }
}
