import { CommmandTypes } from "../CommmandTypes";
import { Command } from "./Command";
import { Expense, ExpenseStore } from "../Store/ExpenseStore";
import { ShareStore, ShareType, Share } from "../Store/ShareStore";
import { ExpensesRepositoryInterface } from "../Repositories/ExpensesRepository";
import { Splitwise } from "../Splitwise";

export class ExpenseCommand extends Command {
    public readonly commandId = CommmandTypes.EXPENSE;

    constructor(
        private expensesRepository: ExpensesRepositoryInterface,
        private splitwise: Splitwise
    ){ super(); }
    
    run(args: string[]): string {
        let [payerId, amountString, shareCountString, ...shareInfo] = args;
        const amount: number = Number.parseFloat(amountString);
        const expense: Expense = { payerId, amount }
        
        const shareCount: number = Number.parseInt(shareCountString);

        // TODO: Check shareCount must be equal to shareUser.length
        const shareUsers = shareInfo.slice(0, shareCount);
        const [shareTypeString, ...sharedValues] = shareInfo.slice(shareCount) ;
        const shareType: ShareType = ShareType[shareTypeString as keyof typeof ShareType]; // handle NULL
        const shareAmounts = this.splitwise.split({
            amount,
            type: shareType,
            splitInto: shareCount,
            shares: sharedValues.map(value => Number(Number(value).toFixed(2)))
        });
        
        const shares: Share[] = shareUsers.map((userId: string, index) => ({
            userId,
            value: Number.parseFloat(sharedValues[index]),
            shareType: shareType,
            amount: shareAmounts[index]
        }));
        
        const expenseId = this.recordExpense(expense, shares);
        
        return `EXPENSE [${expenseId}] split as ${shareAmounts.toString()} and recorded Successfully!`;
    }

    recordExpense(expense: Expense, shares: Share[]) {
        return this.expensesRepository.insertExpense(
            expense, 
            shares.filter(share => share.userId !== expense.payerId)
        );
    }
}