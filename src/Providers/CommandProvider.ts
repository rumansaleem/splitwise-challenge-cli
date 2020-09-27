import { Application } from "../Application";
import { ExpenseCommand } from "../Commands/ExpenseCommand";
import { ShowCommand } from "../Commands/ShowCommand";
import { ExitCommand } from "../Commands/ExitCommand";
import { ExpensesRepositoryToken } from "../Repositories/ExpensesRepository";
import { EmptyCommand } from "../Commands/EmptyCommand";
import { InvalidCommand } from "../Commands/InvalidCommand";
import { Provider } from "./Provider";
import { Splitwise } from "../Splitwise";

export class CommandProvider extends Provider {
    register(app: Application) {
        app.bind<ExitCommand>(ExitCommand.name, () => new ExitCommand());
        app.bind<EmptyCommand>(EmptyCommand.name, () => new EmptyCommand());
        app.bind<InvalidCommand>(InvalidCommand.name, () => new InvalidCommand());

        app.bind<ExpenseCommand>(
            ExpenseCommand.name, 
            () => new ExpenseCommand(app.resolve(ExpensesRepositoryToken), app.resolve(Splitwise.name))
        );

        app.bind<ShowCommand>(
            ShowCommand.name, 
            () => new ShowCommand(app.resolve(ExpensesRepositoryToken))
        );

    }
}