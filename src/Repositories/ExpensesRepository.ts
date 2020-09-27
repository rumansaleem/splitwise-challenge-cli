import { Expense, ExpenseStore, ExpenseWithShares } from "../Store/ExpenseStore";
import { Share, ShareType, ShareStore } from "../Store/ShareStore";

export const ExpensesRepositoryToken = 'ExpenseRepository';

export interface DebtRecord {
    payerId: string;
    payeeId: string;
    amount: number;
}

export interface ExpensesRepositoryInterface {
    insertExpense(expense: Expense, shares: Share[]): string;
    getAllDebts(): DebtRecord[];
    getAllDebtsByUserId(userId: string): DebtRecord[];
}

export class ExpensesStoreRepository implements ExpensesRepositoryInterface {
    constructor(private expenseStore: ExpenseStore, private shareStore: ShareStore){}
    
    insertExpense(expense: Expense, shares: Share[]): string {
        const expenseId = this.expenseStore.insert(expense);
        
        this.shareStore.insertAll(shares.map(share => ({...share, expenseId })));

        return expenseId;
    }

    getAllDebts(): DebtRecord[] {
        return this.expenseStore.getAll()
            .flatMap(expense => this.shareStore.getByExpenseId(expense.id || '')
                .filter(share => share.userId !== expense.payerId)
                    .map(share => ({
                        payerId: expense.payerId, 
                        payeeId: share.userId, 
                        amount: share.amount
                    }))
            );
    }

    getAllDebtsByUserId(userId: string): DebtRecord[] {
        return this.getAllDebts()
            .filter(debt => debt.payeeId === userId || debt.payerId === userId);
    }
}