import {Store} from './Store';
import { Share } from './ShareStore';

export class ExpenseStore extends Store<Expense> {
    idAttribute = 'id';
    getId() {
        return null;
    }
}



export interface Expense {
    id?: string; // Optional, auto-generated UUID
    payerId: string;
    amount: number;
}

export interface ExpenseWithShares extends Expense {
    shares: Share[];
}