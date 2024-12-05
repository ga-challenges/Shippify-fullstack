import mysql2 from 'mysql2/promise';
import { DbSet, UnitOfWorkFactory, UnitOfWork } from '../../../../@core/commom/application/unit-of-work/unit-of-work';
import MySql from '../mysql';
import { Repository } from '../../../../@core/commom/domain/repository';
import MySql2Adapter from '../mysql2';

export class DbSetMySQL2 implements DbSet{
    private repos: {
      [key: string]: new(em: MySql) => Repository<unknown>
    } = {};
  
    constructor() {}
  
    registerRepository(name: string, repo: new(em:  MySql) => Repository<unknown>) {
        this.repos[name] = repo;
    }
  
    getRepository(name: string): any {
        const repo = this.repos[name];
        if(!repo) { throw new Error(`repository not founded ${name}` );}
        return repo;
    }
}

export class UnitOfWorkMySQL2Factory implements UnitOfWorkFactory {
    constructor(
        private connection: mysql2.Pool,
        private dbSet: DbSet
    ) {}

    create() {
        return new UnitOfWorkMySQL2(this.connection, this.dbSet);
    }
}

export default class UnitOfWorkMySQL2 implements UnitOfWork {
    private connection: mysql2.PoolConnection | null = null;

    constructor(
        private readonly pool: mysql2.Pool,
        private readonly dbSet: DbSet
    ) {}

    async startTransaction(): Promise<void> {
        this.connection = await this.pool.getConnection();
        this.connection.beginTransaction();
    }

    async commit(): Promise<void> {
        await this.connection?.commit();
        this.connection?.destroy();
        this.connection = null;
    }

    async rollback(): Promise<void> {
        await this.connection?.rollback();
        this.connection?.destroy();
        this.connection = null;
    }

    getRepository<T extends Repository<unknown>>(repository: string): T {
        const Repository = this.dbSet.getRepository(repository) as any;
        return new Repository(new MySql2Adapter(this.connection!)) as T;
    }
}
