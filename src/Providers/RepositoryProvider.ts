import { Application } from "../Application";
import { ExpensesStoreRepository, ExpensesRepositoryInterface, ExpensesRepositoryToken } from "../Repositories/ExpensesRepository";
import { ExpenseStore } from "../Store/ExpenseStore";
import { ShareStore } from "../Store/ShareStore";
import { Provider } from "./Provider";

export class RepositoryProvider extends Provider {
    register(app: Application) {
        app.bind<ExpensesRepositoryInterface>( 
            ExpensesRepositoryToken, 
            () => new ExpensesStoreRepository(
                app.resolve<ExpenseStore>('ExpenseStore'), 
                app.resolve<ShareStore>('ShareStore')
            )
        );
    }
}