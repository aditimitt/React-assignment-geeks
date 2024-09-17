import type { NextApiRequest, NextApiResponse } from 'next';
import Candidate from '../../models/Candidate';
import { connectToDatabase } from '../../lib/mongodb';
import { Candidate as CandidateType } from '../../types';

type Data = CandidateType | CandidateType[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const { search } = req.query;

      if (search) {
        // Search candidates by skills
        const candidates = await Candidate.find({
          skills: { $regex: search as string, $options: 'i' },
        });
        res.status(200).json(candidates);
      } else {
        // Fetch all candidates
        const candidates = await Candidate.find({});
        res.status(200).json(candidates);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching candidates' });
    }
  } else if (req.method === 'POST') {
    try {
      const newCandidate = new Candidate(req.body);
      await newCandidate.save();
      res.status(201).json(newCandidate);
    } catch (error) {
      res.status(500).json({ message: 'Error adding candidate' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
