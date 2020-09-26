import * as readline from 'readline';
import { Command } from './src/Commands/Command';
import { CommmandTypes } from './src/CommmandTypes';
import app from './bootstrap';
import { Kernel } from './src/Kernel';

const kernel = app.resolve<Kernel>(Kernel.name);

const lineReader = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    prompt: 'splitwise > '
});

lineReader.on('line', (query) => {
    const output: string = kernel.handle(query);
    
    console.log(output);

    lineReader.prompt();
    // if (command.commandId !== CommmandTypes.EXIT) {
    // } else {
    //     lineReader.close();
    // }

});

lineReader.prompt();