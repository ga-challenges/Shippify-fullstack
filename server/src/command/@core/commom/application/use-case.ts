import DomainEventManager from './event/event-manager';
import Logger from './logger/logger';
import { UnitOfWork, UnitOfWorkFactory } from './unit-of-work/unit-of-work';

interface UseCase<Input, Output> {
    execute(input: Input): Promise<Output>
}

export abstract class BaseUseCaseCommand<I, O> implements UseCase<I, O> {
    constructor(
        protected readonly unitOfWorkFactory: UnitOfWorkFactory,
        protected readonly domainEventManager: DomainEventManager,
        protected readonly logger: Logger
    ) {}

    protected abstract context: string

    async execute(input: I): Promise<O> {
        const unitOfWork = this.unitOfWorkFactory.create();
        await unitOfWork.startTransaction();
        try {
            const output = await this.handle(input, unitOfWork);
            await unitOfWork.commit();
            return output;
        } catch (err) {
            await unitOfWork.rollback();
            if (err instanceof Error) {
                this.logger.error(`CANNOT ${this.context}: ${err.message}`);
            }
            throw err;
        }
    }

    // template method
    protected abstract handle(input: I, unitOfWork: UnitOfWork): Promise<O>;
}


export default UseCase;
