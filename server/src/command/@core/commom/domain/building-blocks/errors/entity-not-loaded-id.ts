import DomainError from './domain-error';

export default class EntityNotLoadedIdDomainError extends DomainError {
    constructor() {
        super('The ID of this entity has not been loaded.');
    }
}
