import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import Status from '../../../commom/domain/building-blocks/value-objects/status';
import DriverInactivedDomainEvent from '../events/driver-inactived';
import DriverRegistredDomainEvent from '../events/driver-registred';
import Driver from './driver';

describe('DomainModel Driver', () => {
    it('should be able to register a new driver', () => {
        const driver = Driver.register({
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png'
        });

        const driverEvents = driver.getEvents();
        expect(driverEvents).toHaveLength(0);

        driver.setId(new IncrementID(1));
        const [driverRegistredDomainEvent] = driverEvents as [DriverRegistredDomainEvent];

        expect(driverEvents).toHaveLength(1);
        expect(driverRegistredDomainEvent).toBeInstanceOf(DriverRegistredDomainEvent);
        expect(driverRegistredDomainEvent.id).toBe(1);

        expect(driver).toBeInstanceOf(Driver);
        expect(driver.toJson()).toMatchObject({
            id: 1,
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active'
        });
    });

    it('should be able to recover an existing driver', () => {
        const driver = Driver.recover({
            id: 100,
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active'
        });

        expect(driver).toBeInstanceOf(Driver);
        expect(driver.toJson()).toMatchObject({
            id: 100,
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active'
        });
    });

    it('should be able inactive an existing driver', () => {
        const driver = Driver.recover({
            id: 100,
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active'
        });

        driver.inactive();

        const [driverInactivedDomainEvent] = driver.getEvents() as [DriverInactivedDomainEvent];
        expect(driverInactivedDomainEvent).toBeInstanceOf(DriverInactivedDomainEvent);
        expect(driverInactivedDomainEvent.driverId).toBe(100);
        expect(driver.getStatus().match(new Status('inactive'))).toBeTruthy();
    });
});
