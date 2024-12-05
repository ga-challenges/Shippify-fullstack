
import City from '../../../../commom/domain/building-blocks/value-objects/city';
import Status from '../../../../commom/domain/building-blocks/value-objects/status';
import Driver from '../../models/driver';
import AvatarUrl from '../../models/value-objects/avatar-url';
import Email from '../../models/value-objects/email';
import Phone from '../../models/value-objects/phone';
import DriverBuilder from './driver';

describe('DriverBuilder', () => {
    it('should build a Driver instance with all required fields', () => {
        const driver = new DriverBuilder()
            .setId(1)
            .setCompanyId(2)
            .setName('John Doe')
            .setEmail(new Email('john.doe@gmail.com'))
            .setPhone(new Phone('11999999999'))
            .setCity(new City(1))
            .setAvatarUrl(new AvatarUrl('https://avatar.com/image.png'))
            .setStatus(new Status('active'))
            .build();

        expect(driver).toBeInstanceOf(Driver);
        expect(driver.toJson()).toMatchObject({
            id: 1,
            companyId: 2,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            city: 1,
            avatarUrl: 'https://avatar.com/image.png',
            status: 'active'
        });
    });
});
