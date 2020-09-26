import { Application } from "../Application";
import { ExpenseStore } from "../Store/ExpenseStore";
import { ShareStore } from "../Store/ShareStore";
import { UserStore } from "../Store/UserStore";
import { Provider } from "./Provider";

export class StoreProvider extends Provider {
    register(app: Application) {
        app.singleton<UserStore>('UserStore', () => new UserStore());
        app.singleton<ExpenseStore>('ExpenseStore', () => new ExpenseStore());
        app.singleton<ShareStore>('ShareStore', () => new ShareStore());
    }
}