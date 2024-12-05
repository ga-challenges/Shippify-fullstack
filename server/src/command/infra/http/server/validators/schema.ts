import Email from '../../../../@core/driver/domain/models/value-objects/email';

export interface IValidatable {
    validate(value: any): { success: boolean, error?: string | Record<string, string>, values?: any }
}

type Validation = {
    handle: (value: any) => boolean,
    message: string,
    conversor?: (value: any) => any
}

export class Schema implements IValidatable {
    protected validations: Validation[] = [];
    public isRequired: boolean = false;
  
    addValidation(validation: Validation) {
        this.validations.push(validation);
        return this;
    }

    validate(value: any): any {
        let definitiveValue = null;

        for(const validation of this.validations) {
            if(!this.isRequired && (value === undefined || value === null || value === '')) {
                break;
            }

            if (!validation.handle(value)) {
                return { success: false, error: validation.message };
            }

            const conversor = validation.conversor || ((value: any) => value);

            definitiveValue = conversor(definitiveValue || value);
        }

        return { success: true, values: definitiveValue };
    }

    required() {
        this.validations.unshift({
            message: 'This field is required',
            handle: (value) => value !== undefined && value !== null && value !== ''
        });
        this.isRequired = true;
        return this;
    }
}

export class ObjectSchema extends Schema implements IValidatable {
    constructor(private shape: Record<string, IValidatable> = {}) {
        super();
        this.shape = shape;
    }
  
    validate(object: any): any {
        const errors: Record<string, string | Record<string, string>> = {};
        let isValid = true;
        const validatedObject: any = {};

        if(!this.isRequired && !object) {
            return { success: true, values: undefined };
        }

        if(this.isRequired && !object) {
            return { success: false, error: 'This field is required' };
        }

        for (const key in this.shape) {
            const schema = this.shape[key];

            const result = schema.validate(object[key]);

            if (!result.success) {
                errors[key] = result.error || '';
                isValid = false;
                continue;
            }

            validatedObject[key] = result.values;
        }

        return isValid ? { success: true, values: validatedObject } : { success: false, error: errors };
    }
}

export class StringSchema extends Schema {
    constructor() {
        super();
        this.addValidation({
            message: 'Value must be a string',
            handle: (value: any) => typeof value === 'string'
        });
    }
  
    email() {
        return this.addValidation({
            message: 'Invalid email format',
            handle: (value: any) => Email.validateEmail(value)
        });
    }

    maxLength(length: number) {
        return this.addValidation({
            message: `max length is ${length}`,
            handle: (value: any) => value.length <= length
        });
    }
}

export class NumberSchema extends Schema {
    constructor() {
        super();
        this.addValidation({
            handle: (value: any) => !Number.isNaN(+value),
            message: 'Value must be a number',
            conversor: (value: any) => +value
        });
    }
}

export class BooleanSchema extends Schema {
    constructor() {
        super();
        this.addValidation({
            handle: (value: any) => typeof value === 'boolean',
            message: 'Value must be a boolean'
        });
    }
}

export class BufferSchema extends Schema {
    constructor() {
        super();
        this.addValidation({
            handle: (value: any) => Buffer.isBuffer(value),
            message: 'Value must be a Buffer'
        });
    }
}

export class FileSchema extends Schema {
    constructor() {
        super();
        const schema = new ObjectSchema({
            originalname: new StringSchema().required(),
            buffer: new BufferSchema().required()
        }).required();
        this.addValidation({
            handle: (value: any) => schema.validate(value).success,
            message: 'Value must be a file'
        });
    }
}

export class ArraySchema extends Schema {
    constructor(private itemSchema?: IValidatable) {
        super();
        this.addValidation({
            message: 'Value must be an array',
            handle: (value: any) => Array.isArray(value)
        });
    }

    minLength(min: number) {
        return this.addValidation({
            message: `Array must have at least ${min} items`,
            handle: (value: any) => Array.isArray(value) && value.length >= min
        });
    }

    items(schema: IValidatable) {
        this.itemSchema = schema;
        return this.addValidation({
            message: 'Array contains invalid items',
            handle: (value: any) => {
                if (!Array.isArray(value)) return false;
                return value.every(item => this.itemSchema!.validate(item).success);
            }
        });
    }

    validate(value: any): any {
        const result = super.validate(value);
        if (!result.success) {
            return result;
        }

        if (this.itemSchema && Array.isArray(value)) {
            const validatedItems = value.map((item: any) => this.itemSchema!.validate(item));

            const invalidItem = validatedItems.find(item => !item.success);
            if (invalidItem) {
                return { success: false, error: invalidItem.error };
            }

            const validValues = validatedItems.map(item => item.values);
            return { success: true, values: validValues };
        }

        return { success: true, values: value };
    }
}
