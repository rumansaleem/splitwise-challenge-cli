import { Store } from './Store';
import { Expense } from './ExpenseStore';

export class ShareStore extends Store<Share> {
    idAttribute = 'id';
    getId() {
        return null;
    }
}

export enum ShareType {
    EQUAL = 'EQUAL', 
    PERCENT = 'PERCENT', 
    EXACT = 'EXACT'
}

export interface Share {
    id?: string; // Optional, auto-generated UUID
    expenseId?: string; // optional, not assigned until expense is created
    shareType: ShareType;
    userId: string;
    value: number;
}

export interface ShareWithExpense {
    expense: Expense;
}