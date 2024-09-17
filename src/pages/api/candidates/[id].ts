// src/pages/api/candidates/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Candidate from '../../../models/Candidate';
import { connectToDatabase } from '../../../lib/mongodb';
import { Candidate as CandidateType } from '../../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CandidateType | { message: string }>) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const candidate = await Candidate.findById(id);
      if (candidate) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: 'Candidate not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching candidate' });
    }
  } else if (req.method === 'PUT') {
    try {
      const candidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
      if (candidate) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: 'Candidate not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating candidate' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
