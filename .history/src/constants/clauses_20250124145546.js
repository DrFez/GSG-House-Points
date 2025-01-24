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
  // Attendance
  { id: "5.5", name: "Perfect Attendance (Term)", points: [2] },

  // Music
  { id: "5.6", name: "Music Ensemble/Band Involvement", points: [1] },

  // Sporting
  { id: "5.7.1", name: "Country Week Participation", points: [1] },
  { id: "5.7.2", name: "Inter-School Carnival Squad", points: [1] },

  // Colours Recognition
  { id: "5.8.1", name: "Half Colours", points: [4] },
  { id: "5.8.2", name: "Full Colours", points: [10] },
  { id: "5.8.3", name: "Honours", points: [20] },

  // Wave Award
  { id: "5.9", name: "Wave Award", points: [5] },

  // Special Events
  { id: "5.10", name: "Special Events", points: [] },

  // Staff Discretion
  { id: "5.11", name: "Staff Discretion", points: [1, 2, 3] }
];