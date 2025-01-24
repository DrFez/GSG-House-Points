export interface Clause {
  id: string;
  name: string;
  points: number[];
  description?: string;
}

export const clauses: Clause[] = [
  { id: "5.1.1", name: "Swimming Carnival (Primary)", points: [32, 24, 16, 8] },
  { id: "5.1.2", name: "Swimming Carnival (Secondary)", points: [32, 24, 16, 8] },
  { id: "5.1.3", name: "Athletics Carnival (Primary)", points: [32, 24, 16, 8] },
  { id: "5.1.4", name: "Athletics Carnival (Secondary)", points: [32, 24, 16, 8] },
  { id: "5.1.5", name: "Cross-Country (Primary)", points: [32, 24, 16, 8] },
  { id: "5.1.6", name: "Cross-Country (Secondary)", points: [32, 24, 16, 8] },
  { id: "5.1.7", name: "VACS Sports (7-9)", points: [32, 24, 16, 8] },
  { id: "5.1.8", name: "VACS Sports (10-12)", points: [32, 24, 16, 8] },
  { id: "5.2", name: "VACS Arts Program", points: [8, 6, 4, 2] },
  { id: "5.3", name: "Running of the Flags", points: [12, 8, 6, 4] },
  { id: "5.4", name: "Academic Achievements", points: [2, 2, 1] },
  { id: "5.5", name: "Attendance", points: [2] },
  { id: "5.6", name: "Music", points: [1] },
  { id: "5.7", name: "Sporting", points: [1] },
  { id: "5.8", name: "Colours Recognition", points: [2, 5, 10] },
  { id: "5.9", name: "Leadership Roles", points: [5, 1] },
  { id: "5.10", name: "House Fundraiser", points: [12, 8, 6, 4] },
  { id: "5.11", name: "Staff Discretion", points: [1, 2, 3] },
];
