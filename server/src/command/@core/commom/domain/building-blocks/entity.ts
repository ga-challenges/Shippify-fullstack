import EntityNotChangeDomainError from './errors/entity-not-change-id';
import EntityNotLoadedIdDomainError from './errors/entity-not-loaded-id';
import ID from './value-objects/id';

/**
 * Represents a domain entity with an optional identifier.
 * @template T The type of the identifier value (string or number).
 */
export default abstract class Entity<T extends string | number> {
    /**
     * The creation date of the entity.
     * Automatically initialized at the moment of instantiation.
     */
    protected readonly creationDate: Date;

    /**
     * The unique identifier of the entity.
     * Can be set during or after the entity is created.
     */
    private id?: ID<T>;

    /**
     * Constructs the entity.
     * @param id The optional unique identifier.
     */
    constructor(id?: ID<T>) {
        this.creationDate = new Date();
        this.id = id;
    }

    /**
     * Sets the unique identifier for the entity.
     * Throws an error if the identifier is already set.
     * @param id The unique identifier to assign.
     * @throws {EntityNotChangeDomainError} If the ID is already set.
     */
    setId(id: ID<T>): void {
        if (this.id) {
            throw new EntityNotChangeDomainError();
        }
        this.id = id;
        if(this.onIdRegistred) {
            this.onIdRegistred(id);
        }
    }

    /**
     * Retrieves the value of the entity's identifier.
     * Returns `undefined` if the identifier has not been set.
     * @returns The value of the identifier or `undefined`.
     */
    getIdValue(): T | null {
        return this.id?.getValue() || null;
    }

    /**
     * Retrieves the unique identifier of the entity.
     * Throws an error if the identifier has not been set.
     * @returns The unique identifier of the entity.
     * @throws {EntityNotLoadedIdDomainError} If the identifier has not been set.
     */
    getId(): ID<T> {
        if (!this.id) {
            throw new EntityNotLoadedIdDomainError();
        }
        return this.id;
    }

    onIdRegistred?(id: ID<T>): void

    /**
     * Retrieves the creation date of the entity.
     * The creation date is automatically set at the moment of instantiation.
     * @returns The creation date of the entity.
     */
    getCreationDate(): Date {
        return this.creationDate;
    }
}
