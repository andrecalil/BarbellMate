export class Converter {
    static lbsToKgFactor = 2.205;
  
    static LbsToKgs = (weight: number) => Math.round(weight / Converter.lbsToKgFactor);
  
    static KgsToLbs = (weight: number) => Math.round(weight * Converter.lbsToKgFactor);
  };