export interface House {
  name: string;
  color: string;
  emblem: string;
  points: number;
}

export const houses: House[] = [
  { name: "Baudin", color: "#1E90FF", emblem: "Seahorse", points: 0 },
  { name: "Camfield", color: "#FFFFFF", emblem: "Owl", points: 0 },
  { name: "Wilson", color: "#FF0000", emblem: "Serpent", points: 0 },
  { name: "Mokare", color: "#008000", emblem: "Gecko", points: 0 },
];
