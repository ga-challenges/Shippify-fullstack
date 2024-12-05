import { Repository } from '../../domain/repository';

export interface DbSet {
  getRepository(repo: string): typeof Repository<unknown>
}

export type RepositoryName = 'vehicle' | 'driver' | 'company'

export interface UnitOfWork {
    getRepository<T extends Repository<unknown>>(repository: RepositoryName): T
    startTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}

export interface UnitOfWorkFactory {
    create(): UnitOfWork
};
