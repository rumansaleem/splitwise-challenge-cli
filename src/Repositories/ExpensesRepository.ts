import { Expense, ExpenseStore } from "../Store/ExpenseStore";
import { Share, ShareType, ShareStore } from "../Store/ShareStore";

export const ExpensesRepositoryToken = 'ExpenseRepository';

export interface ExpensesRepositoryInterface {
    insertExpense(expense: Expense, shares: Share[]): string;
    getAllShares(): Share[];
    getAllShareByUserId(userId: string): Share[];
}

export class ExpensesStoreRepository implements ExpensesRepositoryInterface {
    constructor(private expenseStore: ExpenseStore, private shareStore: ShareStore){}
    
    insertExpense(expense: Expense, shares: Share[]): string {
        const expenseId = this.expenseStore.insert(expense);
        
        this.shareStore.insertAll(shares.map(share => ({...share, expenseId })));

        return expenseId;
    }

    getAllShares(): Share[] {
        return this.shareStore.getAll();
    }

    getAllShareByUserId(userId: string): Share[] {
        const paidExpense = this.expenseStore.getAll()
            .filter(expense => expense.payerId === userId);

        const paidExpenseIds = paidExpense.map(expense => expense.id);

        return this.shareStore.getAll()
            .filter(share => share.userId === userId);
    }
}