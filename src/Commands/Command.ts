export abstract class  Command {
    abstract readonly commandId: string;
    abstract run(args: string[]): string;
}