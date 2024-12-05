import { ulid } from 'ulid';
import ValueObject from './value-object';

export default class ID<T extends string | number> extends ValueObject<T> {}

export class ULID extends ID<string> {
    constructor(
        id?: string
    ) {
        super(id || ulid());
    }
}

export class IDMock extends ID<string> {}

export class IncrementID extends ID<number> {}
