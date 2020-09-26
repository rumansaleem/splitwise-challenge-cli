import { Command } from "./Command";
import { CommmandTypes } from "../CommmandTypes";
import { ExpensesRepositoryInterface } from "../Repositories/ExpensesRepository";

export class ShowCommand implements Command {
    public readonly commandId = CommmandTypes.SHOW;

    constructor(private expenseRepository: ExpensesRepositoryInterface) {} 
    
    public run(args: string[]): string {
        return args.length > 0 ? this.showById(args[0]) : this.showAll();
    }

    private showAll(): string {
        return JSON.stringify(this.expenseRepository.getAllShares());
    }

    private showById(userId: string): string {
        return JSON.stringify(this.expenseRepository.getAllShareByUserId(userId));
    }
}