import { Application } from "./src/Application";
import { ApplicationProvider } from "./src/Providers/ApplicationProvider";

const app = Application.getInstance();


app.singleton('ApplicationProvider', () => new ApplicationProvider());

const applicationProvider = app.resolve<ApplicationProvider>('ApplicationProvider');

applicationProvider.register(app);
applicationProvider.boot(app);


export default app;

