import City from '../../../../commom/domain/building-blocks/value-objects/city';
import { IncrementID } from '../../../../commom/domain/building-blocks/value-objects/id';
import Status from '../../../../commom/domain/building-blocks/value-objects/status';
import Builder from '../../../../commom/domain/design-patterns/builder';
import Driver from '../../models/driver';
import AvatarUrl from '../../models/value-objects/avatar-url';
import Email from '../../models/value-objects/email';
import Phone from '../../models/value-objects/phone';

export default class DriverBuilder implements Builder<Driver> {
    private id?: IncrementID;
    private companyId!: IncrementID;
    private name!: string;
    private email!: Email;
    private phone!: Phone;
    private city!: City;
    private avatarUrl!: AvatarUrl;
    private status!: Status;

    setId(id: number | undefined): this {
        this.id = id ? new IncrementID(id) : undefined;
        return this;
    }

    setCompanyId(companyId: number): this {
        this.companyId = new IncrementID(companyId);
        return this;
    }

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setEmail(email: Email): this {
        this.email = email;
        return this;
    }

    setPhone(phone: Phone): this {
        this.phone = phone;
        return this;
    }

    setCity(city: City): this {
        this.city = city;
        return this;
    }

    setAvatarUrl(avatarUrl: AvatarUrl): this {
        this.avatarUrl = avatarUrl;
        return this;
    }

    setStatus(status: Status): this {
        this.status = status;
        return this;
    }

    build(): Driver {
        return new Driver(
            this.id,
            this.companyId,
            this.name,
            this.email,
            this.phone,
            this.avatarUrl,
            this.status,
            this.city
        );
    }
}
