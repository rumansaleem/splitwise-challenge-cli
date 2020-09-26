import { Command } from "./Command";
import { CommmandTypes } from "../CommmandTypes";

export class ExitCommand implements Command {
    public readonly commandId = CommmandTypes.EXIT;
    
    public run(): string {
        return  'Good Bye!';
    }
}