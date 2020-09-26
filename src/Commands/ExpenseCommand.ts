import { CommmandTypes } from "../CommmandTypes";
import { Command } from "./Command";
import { Expense, ExpenseStore } from "../Store/ExpenseStore";
import { ShareStore, ShareType, Share } from "../Store/ShareStore";
import { ExpensesRepositoryInterface } from "../Repositories/ExpensesRepository";

export class ExpenseCommand extends Command {
    public readonly commandId = CommmandTypes.EXPENSE;

    constructor(private expensesRepository: ExpensesRepositoryInterface){
        super();
    }
    
    run(args: string[]): string {
        let [payerId, amountString, shareCountString, ...shareInfo] = args;
        const amount: number = Number.parseFloat(amountString);
        const expense: Expense = { payerId, amount }
        
        const shareCount: number = Number.parseInt(shareCountString);

        // TODO: Check shareCount must be equal to shareUser.length
        const shareUsers = shareInfo.slice(0, shareCount);
        const [shareTypeString, ...sharedValues] = shareInfo.slice(shareCount) ;
        const shareType: ShareType = ShareType[shareTypeString as keyof typeof ShareType]; // handle NULL
        
        const shares: Share[] = shareUsers.map((userId: string, index) => ({
            userId,
            value: Number.parseFloat(sharedValues[index]),
            shareType: shareType
        }))
        
        const expenseId = this.recordExpense(expense, shares);
        
        return `EXPENSE [${expenseId}] Recorded Successfully!`;
    }

    recordExpense(expense: Expense, shares: Share[]) {
        return this.expensesRepository.insertExpense(expense, shares);
    }
}