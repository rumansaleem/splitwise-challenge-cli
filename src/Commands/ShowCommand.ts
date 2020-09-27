import { Command } from "./Command";
import { CommmandTypes } from "../CommmandTypes";
import { ExpensesRepositoryInterface, DebtRecord } from "../Repositories/ExpensesRepository";
import { Share, ShareWithExpense } from "../Store/ShareStore";

export class ShowCommand implements Command {
    public readonly commandId = CommmandTypes.SHOW;

    constructor(private expenseRepository: ExpensesRepositoryInterface) {} 
    
    public run(args: string[]): string {
        return args.length > 0 ? this.showById(args[0]) : this.showAll();
    }

    private showAll(): string {
        const debts = this.expenseRepository.getAllDebts();
        return this.presentDebts(debts);
    }

    private showById(userId: string): string {
        const debts = this.expenseRepository.getAllDebtsByUserId(userId);

        return this.presentDebts(debts);
    }

    private simplifyDebts(debts: DebtRecord[]) {
        
    }

    private presentDebts(debts: DebtRecord[]): string {
        return debts
            .map(debt => `[User:${debt.payeeId}] owes [User:${debt.payerId}] ${debt.amount}$`)
            .join("\n");
    }
}