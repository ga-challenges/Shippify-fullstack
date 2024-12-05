export class Registry {
    private dependencies = new Map<string, unknown>();
    private static instance: Registry;

    private constructor () {}

    provide(name: string, dependency: unknown) {
        this.dependencies.set(name, dependency);
    }

    inject<T>(name: string): T {
        if(!this.dependencies.get(name)) throw Error(name);
        return this.dependencies.get(name) as T;
    }

    static getInstance () {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }

        return Registry.instance;
    }
}

export function inject(name: string) {
    return (target: any, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get() {
                const dependency = Registry.getInstance().inject(name);
                return dependency;
            },
            enumerable: true,
            configurable: true
        });
    };
}
