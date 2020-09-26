import { Provider } from "./Provider";
import { Application } from "../Application";
import { Splitwise } from "../Splitwise";
import { EqualSplitter } from "../Splitters/EqualSplitter";
import { ExactSplitter } from "../Splitters/ExactSplitter";
import { PercentSplitter } from "../Splitters/PercentSplitter";
import { AbstractSplitter } from "../Splitters/SplitterInterface";
import { ShareType } from "../Store/ShareStore";

export class SplitwiseProvider extends Provider {
    static readonly splitters: {[key:string]: string} = {
        [ShareType.EQUAL]: EqualSplitter.name,
        [ShareType.EXACT]: ExactSplitter.name,
        [ShareType.PERCENT]: PercentSplitter.name,
    }
    
    register(app: Application) {
        app.bind(Splitwise.name, () => new Splitwise());
        app.bind(EqualSplitter.name, () => new EqualSplitter());
        app.bind(ExactSplitter.name, () => new ExactSplitter());
        app.bind(PercentSplitter.name, () => new PercentSplitter());
    }
}