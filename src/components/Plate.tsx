import { OlympicPlate } from '../constants';
  
export const Plate = ({ plate } : {plate: OlympicPlate}) => {
    return (<div className={`plate ${plate.color} ${plate.value < 10 ? "small" : ""}`}>{plate.name}</div>)
};