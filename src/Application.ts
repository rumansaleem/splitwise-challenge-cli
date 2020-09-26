import { ExpenseStore } from "./Store/ExpenseStore";
import { ExpensesStoreRepository } from "./Repositories/ExpensesRepository";

type FactoryFunction<T> = (app: Application) => T;

export class Application {
    private registry: {[key: string]: {factory: FactoryFunction<any>, singleton: boolean}} = {};
    private cachedSingletons: {[key: string]: any} = {};

    private static instance: Application;

    private constructor() {}

    public static getInstance() {
        if (Application.instance == null) {
            this.instance = new Application();
        }

        return this.instance;
    }

    public has(key: string) {
        return key in this.registry;
    }
    
    public bind<T>(key: string, factory: FactoryFunction<T>) {
        this.registry[key] = { factory, singleton: false };
    }

    public singleton<T>(key: string, factory: FactoryFunction<T>) {
        this.registry[key] = { factory, singleton: true };
    }

    public resolve<T>(key: string): T {
        if (! (key in this.registry)) {
            throw new Error(`Cant resolve '${key}' dependency`);
        }

        const dependency = this.registry[key];
        if(! dependency.singleton) {
            return dependency.factory(this);
        }

        if (! (key in this.cachedSingletons)) {
            this.cachedSingletons[key] = dependency.factory(this);
        }

        return this.cachedSingletons[key];
    }
}