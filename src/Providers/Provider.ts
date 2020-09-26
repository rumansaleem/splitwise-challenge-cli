import { Application } from "../Application";
export abstract class Provider {
    abstract register(app: Application): void;
    boot(app: Application): void {};
}