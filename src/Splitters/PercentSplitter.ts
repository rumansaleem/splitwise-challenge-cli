import { AbstractSplitter } from "./SplitterInterface";
import { ShareType } from "../Store/ShareStore";

export class PercentSplitter extends AbstractSplitter {
    splitType = ShareType.PERCENT;

    split(amount: number, splitInto: number, shares: number[]): number[] {
        const totalPercent = shares.map(share => Number(share.toFixed()))
            .reduce((prev, curr) => prev + curr); 

        const inputError = Number((100 - totalPercent).toFixed(2));

        if (inputError > this.errorTolerance) {
          throw new Error('Percentage share has significant error.');  
        }

        const shareAmounts = shares.map(share => Number((share * amount / 100).toFixed(2)));
        const shareSum = shareAmounts.reduce((prev, curr) => prev + curr);
        const shareError = Number((amount - shareSum).toFixed(2));

        if (shareError < this.errorTolerance) {
            return shareAmounts;
        }
        
        return this.adjustError(shareAmounts, shareError);
    }
}