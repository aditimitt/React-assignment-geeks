import { useState, useEffect } from 'react';
import axios from 'axios';
import { Candidate as CandidateType } from '../../types';
import Link from 'next/link';
import CandidateChart from '../../components/CandidateChart'; 
import Chat from '../../components/Chat';


const RecruiterDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CandidateType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/candidates?search=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching candidates', error);
      }
      setLoading(false);
    };

    fetchCandidates();
  }, [query]);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          placeholder="Search by skills, experience, etc."
        />
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="mb-6">
            <CandidateChart candidates={results} /> {/* Add the chart component here */}
          </div>
        )}
        {!loading && (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Name</th>
                <th className="border-b px-4 py-2 text-left">Skills</th>
                <th className="border-b px-4 py-2 text-left">Experience</th>
                <th className="border-b px-4 py-2 text-left">Location</th>
                <th className="border-b px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((candidate) => (
                <tr key={candidate._id}>
                  <td className="border-b px-4 py-2">{candidate.name}</td>
                  <td className="border-b px-4 py-2">{candidate.skills}</td>
                  <td className="border-b px-4 py-2">{candidate.experience} years</td>
                  <td className="border-b px-4 py-2">{candidate.location}</td>
                  <td className="border-b px-4 py-2">
                    <Link href={`/recruiter/edit/${candidate._id}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="w-full h-80 bg-gray-200 p-4">
        <Chat />
      </div>
    </div>
  );
};

export default RecruiterDashboard;
