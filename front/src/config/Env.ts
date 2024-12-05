import 'dotenv'

export default class Env {
    static get(key: string): string {
        return import.meta.env[key] || ''
    }
}