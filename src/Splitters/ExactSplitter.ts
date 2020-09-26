import { AbstractSplitter } from "./SplitterInterface";
import { ShareType } from "../Store/ShareStore";

export class ExactSplitter extends AbstractSplitter {
    splitType = ShareType.EXACT;

    split(amount: number, splitInto: number, shares: number[]): number[] {
        const sharesSum: number = shares.map(share => Number(share.toFixed(2)))
            .reduce((prev, curr) => prev + curr);
        
        const error = Number((amount - sharesSum).toFixed(2));

        if (Math.abs(error) < this.errorTolerance) {
            return shares;
        }
        
        return this.adjustError(shares, error);
    }
}