// src/types/index.ts

export interface Candidate {
    _id?: string; // Optional, as MongoDB adds _id by default
    name: string;
    skills: string;
    experience: number;
    location: string;
    videoInterviewResults?: string; // Optional, if not always present
    codingResults?: string; // Optional, if not always present
  }
  