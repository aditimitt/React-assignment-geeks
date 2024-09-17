// src/pages/recruiter/edit/[id].tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Candidate as CandidateType } from '../../../types';

const EditCandidate = () => {
  const router = useRouter();
  const { id } = router.query;
  const [candidate, setCandidate] = useState<CandidateType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/api/candidates/${id}`);
        setCandidate(response.data);
      } catch (error) {
        setError('Error fetching candidate');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCandidate();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (candidate) {
      setCandidate({
        ...candidate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/candidates/${id}`, candidate);
      router.push('/recruiter');
    } catch (error) {
      setError('Error updating candidate');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Candidate</h1>
      {candidate && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              value={candidate.skills}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience</label>
            <input
              type="number"
              name="experience"
              value={candidate.experience}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={candidate.location}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Video Interview Results</label>
            <textarea
              name="videoInterviewResults"
              value={candidate.videoInterviewResults || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Coding Results</label>
            <textarea
              name="codingResults"
              value={candidate.codingResults || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditCandidate;
