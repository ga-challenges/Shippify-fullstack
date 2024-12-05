import { UnitOfWork, UnitOfWorkFactory } from '../../../@core/commom/application/unit-of-work/unit-of-work';
import { Repository } from '../../../@core/commom/domain/repository';

export class FakeUow implements UnitOfWork {
    constructor(
        private readonly repositories: Map<string, Repository<any>> = new Map()
    ) {}

    async startTransaction(): Promise<void> {
        
    }

    async commit(): Promise<void> {
        
    }

    getRepository<T extends Repository<any>>(repository: string): T {
        const constructor = this.repositories.get(repository)!;

        return constructor as T;
    }

    async rollback(): Promise<void> {
        
    }
}

export class FakeUowFactory implements UnitOfWorkFactory {
    constructor(
        private repositories: Map<string, Repository<any>>
    ) {}

    create(): UnitOfWork {
        return new FakeUow(this.repositories);
    }
}
