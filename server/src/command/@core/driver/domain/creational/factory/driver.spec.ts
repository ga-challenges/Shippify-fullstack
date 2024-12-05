
import DriverFactory, { DriverFactoryGenerateInput } from './driver';

import Driver from '../../models/driver';
import { RecoverDriverCommand } from '../../models/driver';

describe('DriverFactory', () => {
    it('should generate a new Driver with RegisterDriverCommand', () => {
        const command: DriverFactoryGenerateInput = {
            companyId: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active',
            city: 1
        };

        const driver = DriverFactory.generate(command);

        expect(driver).toBeInstanceOf(Driver);
        expect(driver.toJson()).toMatchObject({
            companyId: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active',
            city: 1
        });
    });

    it('should generate an existing Driver with RecoverDriverCommand', () => {
        const command: RecoverDriverCommand = {
            id: 1,
            companyId: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active',
            city: 2
        };

        const driver = DriverFactory.generate(command);

        expect(driver).toBeInstanceOf(Driver);
        expect(driver.toJson()).toMatchObject({
            id: 1,
            companyId: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active',
            city: 2
        });
    });
});
