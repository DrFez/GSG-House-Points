export const categories = {
  MAJOR_EVENTS_SECONDARY: "Major Events (Secondary)",
  MAJOR_EVENTS_PRIMARY: "Major Events (Primary)",
  VACS: "VACS Program",
  FLAGS: "Running of the Flags",
  ACADEMIC: "Academic Achievements",
  ATTENDANCE: "Attendance",
  MUSIC: "Music",
  SPORTING: "Sporting",
  COLOURS: "Colours Recognition",
  WAVE: "Wave Awards",
  SPECIAL: "Special Events",
  OTHER: "Other"
};

export const clauses = [
  // Major House Events (Secondary)
  { id: "5.1.1", name: "Swimming Carnival (Secondary)", points: [60, 45, 30, 15], category: categories.MAJOR_EVENTS_SECONDARY },
  { id: "5.1.2", name: "Athletics Carnival (Secondary)", points: [60, 45, 30, 15], category: categories.MAJOR_EVENTS_SECONDARY },
  { id: "5.1.3", name: "Cross Country (Secondary)", points: [60, 45, 30, 15], category: categories.MAJOR_EVENTS_SECONDARY },
  { id: "5.1.4", name: "VACS Sports (7-9)", points: [60, 45, 30, 15], category: categories.MAJOR_EVENTS_SECONDARY },
  { id: "5.1.5", name: "VACS Sports (10-12)", points: [60, 45, 30, 15], category: categories.MAJOR_EVENTS_SECONDARY },
  
  // Major House Events (Primary)
  { id: "5.1.6", name: "Swimming Carnival (Primary)", points: [30, 22.5, 15, 7.5], category: categories.MAJOR_EVENTS_PRIMARY },
  { id: "5.1.7", name: "Athletics Carnival (Primary)", points: [30, 22.5, 15, 7.5], category: categories.MAJOR_EVENTS_PRIMARY },
  { id: "5.1.8", name: "Cross Country (Primary)", points: [30, 22.5, 15, 7.5], category: categories.MAJOR_EVENTS_PRIMARY },
  { id: "5.1.9", name: "VACS Sports (Primary)", points: [30, 22.5, 15, 7.5], category: categories.MAJOR_EVENTS_PRIMARY },

  // VACS Arts Program
  { id: "5.2", name: "VACS Arts", points: [8, 6, 4, 2], category: categories.VACS },

  // Running of the Flags
  { id: "5.3", name: "Running of the Flags", points: [12, 8, 6, 4], category: categories.FLAGS },

  // Academic Achievements
  { id: "5.4.1", name: "Endeavour Award", points: [2], category: categories.ACADEMIC },
  { id: "5.4.2", name: "Academic Excellence Award", points: [2], category: categories.ACADEMIC },
  { id: "5.4.3", name: "ICAS & Competition Participation", points: [1], category: categories.ACADEMIC },
  { id: "5.4.4", name: "ICAS & Competition Distinction or Higher", points: [1], category: categories.ACADEMIC },

  // Attendance
  { id: "5.9", name: "Wave Award", points: [5] },

  // Special Events
  { id: "5.10", name: "Special Events", points: [] },

  // Staff Discretion
  { id: "5.11", name: "Staff Discretion", points: [1, 2, 3] }
];