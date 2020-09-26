import { ShareType } from "../Store/ShareStore";

export interface SplitterInterface {
    readonly splitType: ShareType;
    split(amount: number, splitInto: number, shares?: number[]): number[];
}

export abstract class AbstractSplitter implements SplitterInterface {
    abstract readonly splitType: ShareType;
    public readonly errorTolerance: number = 0.01;
    
    abstract split(amount: number, splitInto: number, shares?: number[]): number[];

    public adjustError(shares: number[], error: number): number[] {
        return [ shares[0] + error, ...shares.slice(1) ];
    }
}

