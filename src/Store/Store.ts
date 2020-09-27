import { v4 as uuid } from 'uuid';

export interface StoreInterface<D> {
    keys: string[];
    entites: {[key: string]: D};
    getId(data: D): string | null; 
}

export abstract class Store<D> implements StoreInterface<D> {
    keys: string[] = [];
    entites: {[key: string]: D} = {};
    
    abstract idAttribute: string = '_id';
    abstract getId(data: D): string | null;
    
    insert(item: D): string {
        const key = this.getId(item) || uuid();
        this.keys = [ ...this.keys, key ];
        
        this.entites[key] = {...item, [this.idAttribute]: key};

        return key;
    }

    insertAll(items: D[]): string[] {
        return items.map(item => this.insert(item));
    }
    
    getByKey(key: string) {
        return this.entites[key];
    }
    
    getAll() {
        return this.keys.map(key => this.entites[key]);
    }
}


