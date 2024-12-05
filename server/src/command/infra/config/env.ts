import 'dotenv/config';

export default class Env {
    static get(
        key: string
    ) {
        const value = process.env[key];
        if(value === undefined) {
            throw new Error();
        }
        return value;
    }
}
