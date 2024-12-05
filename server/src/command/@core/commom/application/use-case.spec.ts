import FakeDomainEventManager from '../../../infra/tests/domain-event-manager/fake-domain-event-manager';
import ConsoleLogger from '../../../infra/tests/logger/console';
import { FakeUowFactory } from '../../../infra/tests/unit-of-work/in-memory-unit-of-work';
import { UnitOfWork, UnitOfWorkFactory } from './unit-of-work/unit-of-work';
import { BaseUseCaseCommand } from './use-case';

class SimpleUseCase extends BaseUseCaseCommand<{ value: string }, { result: string }> {
    protected context: string = 'REGISTER DRIVER';

    protected async handle(input: { value: string }, unitOfWork: UnitOfWork): Promise<{ result: string }> {
        return { result: `Hello, ${input.value}` };
    }
}

describe('BaseUseCase', () => {
    let simpleUseCase: SimpleUseCase;
    let unitOfWorkFactory: UnitOfWorkFactory;
    let domainEventManager: FakeDomainEventManager;
    let logger: ConsoleLogger;

    beforeEach(() => {
        const dbSetFake = new Map();
        unitOfWorkFactory = new FakeUowFactory(dbSetFake);
        domainEventManager = new FakeDomainEventManager();
        logger = new ConsoleLogger();
        simpleUseCase = new SimpleUseCase(unitOfWorkFactory, domainEventManager, logger);

        jest.spyOn(domainEventManager, 'publish').mockResolvedValue(undefined);
        jest.spyOn(logger, 'info').mockImplementation(() => {});
    });

    it('should execute the use case and return the correct result', async () => {
        const input = { value: 'World' };

        const result = await simpleUseCase.execute(input);

        expect(result.result).toBe('Hello, World');
        expect(domainEventManager.publish).not.toHaveBeenCalled();
        expect(logger.info).not.toHaveBeenCalled();
    });

    it('should call commit and rollback on failure', async () => {
        const input = { value: 'Error' };
        const unitOfWork = unitOfWorkFactory.create();

        jest.spyOn(unitOfWorkFactory, 'create').mockReturnValue(unitOfWork);

        jest.spyOn(unitOfWork, 'commit').mockRejectedValue(new Error('Commit failed'));
        jest.spyOn(logger, 'error').mockImplementation(() => {});

        const unitOfWorkRollbackSpy = jest.spyOn(unitOfWork, 'rollback');
        const unitOfWorkCommitSpy = jest.spyOn(unitOfWork, 'commit');

        await expect(simpleUseCase.execute(input)).rejects.toThrow('Commit failed');
        expect(logger.error).toHaveBeenCalledWith('CANNOT REGISTER DRIVER: Commit failed');
        expect(unitOfWorkRollbackSpy).toHaveBeenCalledTimes(1);
        expect(unitOfWorkCommitSpy).toHaveBeenCalledTimes(1); 
    });
});
