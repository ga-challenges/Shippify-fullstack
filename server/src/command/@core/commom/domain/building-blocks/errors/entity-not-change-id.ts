import DomainError from './domain-error';

export default class EntityNotChangeDomainError extends DomainError {
    constructor() {
        super('The ID of an entity cannot be changed once it is set.');
    }
}
