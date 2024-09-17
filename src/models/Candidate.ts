// src/models/Candidate.ts
import mongoose from 'mongoose';
import { Candidate as CandidateType } from '../types';

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  videoInterviewResults: { type: String },
  codingResults: { type: String },
});

const Candidate = mongoose.models.Candidate || mongoose.model<CandidateType>('Candidate', CandidateSchema);

export default Candidate;
