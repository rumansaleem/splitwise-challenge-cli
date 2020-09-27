import { SplitterInterface, AbstractSplitter } from "./Splitters/SplitterInterface";
import { ShareType } from "./Store/ShareStore";
import { SplitwiseProvider } from "./Providers/SplitwiseProvider";
import { Application } from "./Application";

export interface SplitOptions  {
    amount: number, 
    type: ShareType, 
    splitInto: number, 
    shares?: number[]
}

export class Splitwise {
    split(splitOptions: SplitOptions) {
        const splitters = SplitwiseProvider.splitters;

        if (! (splitOptions.type in splitters)) {
            throw new Error(`Invalid Share strategy '${splitOptions.type}'`);
        }
        
        const splitterToken = splitters[splitOptions.type];
        const splitter = Application.getInstance().resolve<SplitterInterface>(splitterToken);

        const {amount, splitInto, shares} = splitOptions;

        return splitter.split(amount, splitInto, shares);
    }
}