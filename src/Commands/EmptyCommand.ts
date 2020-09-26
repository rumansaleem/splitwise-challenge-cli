import { Command } from "./Command";

export class EmptyCommand extends Command {
    commandId = '';
    run(args: string[]): string {
        return '';
    }
}