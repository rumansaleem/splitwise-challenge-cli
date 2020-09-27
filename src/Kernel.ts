import { ShowCommand } from "./Commands/ShowCommand";
import { ExitCommand } from "./Commands/ExitCommand";
import { ExpenseCommand } from "./Commands/ExpenseCommand";
import { Command } from "./Commands/Command";
import { CommmandTypes } from "./CommmandTypes";
import { Application } from "./Application";
import { EmptyCommand } from "./Commands/EmptyCommand";
import { InvalidCommand } from "./Commands/InvalidCommand";

const app = Application.getInstance();

export class Kernel {

    public commandList: {[key: string]: string}= {
        [CommmandTypes.EXPENSE]: ExpenseCommand.name,
        [CommmandTypes.SHOW]: ShowCommand.name,
        [CommmandTypes.INVALID]: InvalidCommand.name,
        [CommmandTypes.EXIT]: ExitCommand.name,
    }
    
    public handle(commandString: string): string {
        const [commandId, ...args] = commandString.split(' ');
        
        try {
            const command = this.parseCommand(commandId.replace(/\s/g, ''));
    
            return command.run(args);
        } catch(error) {
            return this.handleError(error);
        }

    }

    private parseCommand(commandId: string): Command {
        if (commandId === '') {
            return app.resolve<EmptyCommand>(EmptyCommand.name);
        }
        
        if (commandId in this.commandList) {
            return app.resolve<Command>(this.commandList[commandId]);
        } 

        return app.resolve<InvalidCommand>(InvalidCommand.name);
    }

    private handleError(error: Error) {
        return `ERROR: ${error.message}`;
    }
}