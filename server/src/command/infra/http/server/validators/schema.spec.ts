import { Schema, StringSchema, ObjectSchema, NumberSchema, BooleanSchema, BufferSchema, FileSchema, ArraySchema } from './schema';

describe('Schema Class', () => {
    it('should validate required field', () => {
        const schema = new Schema();
        schema.required();

        expect(schema.validate(undefined)).toEqual({
            success: false,
            error: 'This field is required'
        });
        expect(schema.validate(null)).toEqual({
            success: false,
            error: 'This field is required'
        });
        expect(schema.validate('')).toEqual({
            success: false,
            error: 'This field is required'
        });
        expect(schema.validate('valid value')).toEqual({ success: true, values: 'valid value' });
    });

    it('should pass validation if field is not required and no value is provided', () => {
        const schema = new Schema();
        schema.addValidation({
            handle: (value: any) => value === '2',
            message: 'Value must be "2"'
        });
        expect(schema.validate(undefined)).toMatchObject({ success: true });
        expect(schema.validate('2')).toMatchObject({ success: true, values: '2' });
        expect(schema.validate('invalid')).toEqual({
            success: false,
            error: 'Value must be "2"'
        });
    });
});

describe('StringSchema Class', () => {
    it('should validate string type', () => {
        const schema = new StringSchema();

        expect(schema.validate(123)).toEqual({
            success: false,
            error: 'Value must be a string'
        });
        expect(schema.validate('string')).toEqual({ success: true, values: 'string' });
    });

    it('should validate email', () => {
        const schema = new StringSchema();
        schema.email();

        expect(schema.validate('it@example.com')).toEqual({ success: true, values: 'it@example.com' });
        expect(schema.validate('invalid-email')).toEqual({
            success: false,
            error: 'Invalid email format'
        });
    });

    it('should validate max length', () => {
        const schema = new StringSchema();
        schema.maxLength(20);
        expect(schema.validate('it@example.fdsfsfdsfadfasdfassfscom')).toEqual({ error: 'max length is 20', success: false });
    });
});

describe('NumberSchema Class', () => {
    it('should validate number type', () => {
        const schema = new NumberSchema();

        expect(schema.validate('abc')).toEqual({
            success: false,
            error: 'Value must be a number'
        });
        expect(schema.validate(123)).toEqual({ success: true, values: 123 });
        expect(schema.validate('123')).toEqual({ success: true, values: 123 });
        expect(schema.validate('123s')).toMatchObject({ success: false });
    });
});

describe('BooleanSchema Class', () => {
    it('should validate boolean type', () => {
        const schema = new BooleanSchema();

        expect(schema.validate('true')).toEqual({
            success: false,
            error: 'Value must be a boolean'
        });
        expect(schema.validate(true)).toEqual({ success: true, values: true });
        expect(schema.validate(false)).toEqual({ success: true, values: false });
    });
});

describe('BufferSchema Class', () => {
    it('should validate Buffer type', () => {
        const schema = new BufferSchema();

        expect(schema.validate('not-a-buffer')).toEqual({
            success: false,
            error: 'Value must be a Buffer'
        });
        expect(schema.validate(Buffer.from('valid-buffer'))).toEqual({ success: true, values: Buffer.from('valid-buffer') });
    });
});

describe('FileSchema Class', () => {
    it('should validate file schema', () => {
        const schema = new FileSchema();

        const validFile = {
            originalname: 'file.txt',
            buffer: Buffer.from('file-content')
        };

        const invalidFile = {
            originalname: '',
            buffer: 'not-a-buffer'
        };

        expect(schema.validate(validFile)).toEqual({ success: true, values: validFile });

        expect(schema.validate(invalidFile)).toEqual({
            success: false,
            error: 'Value must be a file'
        });
    });
});

describe('ArraySchema Class', () => {
    it('should validate array of strings', () => {
        const schema = new ArraySchema(new StringSchema());

        expect(schema.validate(['item1', 'item2'])).toEqual({
            success: true,
            values: ['item1', 'item2']
        });

        expect(schema.validate(['item1', 123])).toEqual({
            success: false,
            error: 'Value must be a string'
        });
    });

    it('should enforce minimum array length', () => {
        const schema = new ArraySchema(new StringSchema()).minLength(2);

        expect(schema.validate(['item1'])).toEqual({
            success: false,
            error: 'Array must have at least 2 items'
        });

        expect(schema.validate(['item1', 'item2'])).toEqual({
            success: true,
            values: ['item1', 'item2']
        });
    });
});

describe('ObjectSchema Class', () => {
    it('should validate object schema', () => {
        const objectSchema = new ObjectSchema({
            name: new StringSchema().required(),
            email: new StringSchema().email()
        }).required();

        const validObject = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            invalidKey: ''
        };

        const invalidObject = {
            name: '',
            email: 'invalid-email'
        };

        expect(objectSchema.validate(validObject)).toEqual({ success: true, values: {
            name: 'John Doe',
            email: 'john.doe@example.com'
        } });

        const result = objectSchema.validate(invalidObject);
        expect(result.success).toBe(false);
        expect(result.error).toEqual({
            name: 'This field is required',
            email: 'Invalid email format'
        });
    });
});
