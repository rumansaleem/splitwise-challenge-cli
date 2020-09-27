import { Store } from './Store';
import { Expense } from './ExpenseStore';

export class ShareStore extends Store<Share> {
    idAttribute = 'id';
    getId() {
        return null;
    }

    getByExpenseId(expenseId: string): Share[] {
        return this.getAll().filter(share => share.expenseId === expenseId);
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
    amount: number; 
}

export interface ShareWithExpense extends Share {
    expense: Expense;
}