import { AbstractSplitter } from "./SplitterInterface";
import { ShareType } from "../Store/ShareStore";

export class EqualSplitter implements AbstractSplitter {
    splitType = ShareType.EQUAL;

    errorTolerance = 0.01;

    split(amount: number, splitInto: number): number[] {
        const equalShare = Number((amount / splitInto).toFixed(2));
        const error = Number((amount - (equalShare * splitInto)).toFixed(2));

        const shares = Array(splitInto).fill(0).map(() => equalShare);
        
        if (error < this.errorTolerance) {
            return shares;
        }
        
        return this.adjustError(shares, error);
    }

    public adjustError(shares: number[], error: number): number[] {
        return [
            shares[0] + error,
            ...shares.slice(1)
        ];
    }
}