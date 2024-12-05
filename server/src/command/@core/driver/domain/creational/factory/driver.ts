import City from '../../../../commom/domain/building-blocks/value-objects/city';
import Status from '../../../../commom/domain/building-blocks/value-objects/status';
import Driver, { RecoverDriverCommand } from '../../models/driver';
import AvatarUrl from '../../models/value-objects/avatar-url';
import Email from '../../models/value-objects/email';
import Phone from '../../models/value-objects/phone';
import DriverBuilder from '../builder/driver';

export interface DriverFactoryGenerateInput extends Omit<RecoverDriverCommand, 'id'> {
    id?: number;
}

export default class DriverFactory {
    static generate(input: DriverFactoryGenerateInput): Driver {
        return new DriverBuilder()
            .setId(input.id)
            .setAvatarUrl(new AvatarUrl(input.avatarUrl))
            .setCity(new City(input.city))
            .setCompanyId(input.companyId)
            .setEmail(new Email(input.email))
            .setName(input.name)
            .setPhone(new Phone(input.phone))
            .setStatus(new Status(input.status))
            .build();
    }
}
