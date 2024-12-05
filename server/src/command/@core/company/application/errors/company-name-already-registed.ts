import ApplicationError from '../../../commom/application/errors/application-error';

export default class CompanyNameAlreadyExists extends ApplicationError {
    constructor() {
        super('Company name already exists');
    }
}
