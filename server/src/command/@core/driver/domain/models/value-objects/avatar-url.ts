import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidAvatarUrlError extends DomainError {
    constructor() {
        super('Avatar URL format is invalid');
    }
}

export default class AvatarUrl extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        if (!this.validateUrl(value)) {
            throw new InvalidAvatarUrlError();
        }
    }

    private validateUrl(url: string): boolean {
        const regex = /^(http|https):\/\/[^ "]+$/;
        return regex.test(url);
    }
}
