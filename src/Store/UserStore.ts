import { Store } from './Store';

export interface User {
    id: string;
    name: string;
    email: string;
}


export class UserStore extends Store<User> {
    idAttribute = 'id';
    getId(user: User): string {
        return user.id;
    }
}