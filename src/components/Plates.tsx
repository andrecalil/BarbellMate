import { Stack } from 'react-bootstrap';
import { OlympicPlate } from '../constants';
import { Plate } from './Plate';

export const Plates = ({ plates, position } : { plates: OlympicPlate[], position: "l" | "r" }) => {
    const sortRight = (l: OlympicPlate, r: OlympicPlate) => {
        if(l.value > r.value) return -1;
        else if(l.value < r.value) return 1;
        else return 0;
    };

    const sortLeft = (l: OlympicPlate, r: OlympicPlate) => {
        if(l.value > r.value) return 1;
        else if(l.value < r.value) return -1;
        else return 0;
    };

    const sortFunc = position === "l" ? sortLeft : sortRight;

    const sortedPlates : OlympicPlate[] = plates.sort(sortFunc);

    return (
        <Stack direction="horizontal" className={`${position === "l" ? "left-plates" : ""}`} gap={0}>
        {sortedPlates.map((p, ix) => (
        <Plate plate={p} key={ix} />
        ))}
        </Stack>
    );
};