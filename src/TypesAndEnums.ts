export type OlympicPlate = {
    name: string;
    value: number;
    color: string;
};

export const Genders = [
    {name: "M 20", value: 0},
    {name: "W 15", value: 1},
] as const;

export const Units = [
    {name: "Kg", value: 0},
    {name: "Lb", value: 1},
] as const;

export const OlympicPlates : OlympicPlate[] = [
    {name: "0.5", value: 0.5, color: "white"},
    {name: "1", value: 1, color: "green"},
    {name: "1.5", value: 1.5, color: "yellow"},
    {name: "2", value: 2, color: "blue"},
    {name: "2.5", value: 2.5, color: "red"},
    {name: "5", value: 5, color: "white"},
    {name: "10", value: 10, color: "green"},
    {name: "15", value: 15, color: "yellow"},
    {name: "20", value: 20, color: "blue"},
    {name: "25", value: 25, color: "red"},
];