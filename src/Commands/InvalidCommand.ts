import { Command } from "./Command";
import { CommmandTypes } from "../CommmandTypes";

export class InvalidCommand extends Command {
    readonly commandId = CommmandTypes.INVALID;
    
    run() { return ''; }
}