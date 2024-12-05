import AggregateRoot from './building-blocks/aggregate-root';

export type RepositoryIdResponse = number

export abstract class Repository<T extends AggregateRoot<string | number> | unknown> {
}
