export default abstract class ValueObject<T> {
    constructor (
    protected readonly value: T
    ) {}

    getValue () {
        return this.value;
    }

    match(
        object: ValueObject<T>
    ) {
        return JSON.stringify(object) === JSON.stringify(this);
    }
}
