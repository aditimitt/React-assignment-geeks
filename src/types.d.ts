// src/types.d.ts
export interface Candidate {
    _id: number;
    name: string;
    skills: string;
    experience: number;
    location: string;
    videoInterviewResults?: string; // Optional, if not always present
    codingResults?: string; // Optional, if not always present
  }
  