import Entity from './entity';
import EntityNotChangeDomainError from './errors/entity-not-change-id';
import EntityNotLoadedIdDomainError from './errors/entity-not-loaded-id';
import { IDMock } from './value-objects/id';

class EntityMock extends Entity<string> {}

describe('Entity', () => {
    it('should create an entity with a valid ID', () => {
        const id = new IDMock('12345');
        const entity = new EntityMock(id);
        expect(entity.getId()).toBe(id);
    });

    it('should not allow modifying the ID', () => {
        const id = new IDMock('67890');
        const entity = new EntityMock(id);
        expect(() => {
            entity.setId(new IDMock('11111'));
        }).toThrow(EntityNotChangeDomainError);
    });

    it('should be able get creation date', () => {
        const entity = new EntityMock();

        const creationDate = entity.getCreationDate();

        expect(creationDate).toBeInstanceOf(Date);
    });

    it('should throw an error when accessing ID if not loaded', () => {
        const entity = new EntityMock();
        expect(() => entity.getId()).toThrow(EntityNotLoadedIdDomainError);
    });
});
