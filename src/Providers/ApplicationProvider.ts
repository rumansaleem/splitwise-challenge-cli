import { Application } from "../Application";
import { StoreProvider } from "./StoreProvider";
import { CommandProvider } from "./CommandProvider";
import { RepositoryProvider } from "./RepositoryProvider";
import { Provider } from "./Provider";
import { Kernel } from "../Kernel";

export class ApplicationProvider extends Provider {
    bootstrap = [
        StoreProvider.name,
        RepositoryProvider.name,
        CommandProvider.name
    ];


    register(app: Application) {
        app.singleton<Kernel>(Kernel.name, () => new Kernel());
        app.singleton<StoreProvider>(StoreProvider.name, () => new StoreProvider());
        app.singleton<RepositoryProvider>(RepositoryProvider.name, () => new RepositoryProvider());
        app.singleton<CommandProvider>(CommandProvider.name, () => new CommandProvider());
    }

    boot(app: Application) {
        this.bootstrap.forEach(providerKey => {
            const provider = (app.resolve(providerKey) as Provider)
            provider.register(app);
            provider.boot(app);
        });
    }
}