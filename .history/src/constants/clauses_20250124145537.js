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
  // Running of the Flags
  { id: "5.3", name: "Running of the Flags", points: [12, 8, 6, 4] },

  // Academic Achievements
  { id: "5.4.1", name: "Endeavour Award", points: [2] },
  { id: "5.4.2", name: "Academic Excellence Award", points: [2] },
  { id: "5.4.3", name: "ICAS & Competition Participation", points: [1] },
  { id: "5.4.4", name: "ICAS & Competition Distinction or Higher", points: [1] },

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