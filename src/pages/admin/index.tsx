'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Candidate } from '../../types';
import CandidateChart from '../../components/CandidateChart';

type FormData = {
  name: string;
  skills: string;
  experience: number;
  location: string;
};

const AdminDashboard = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates', error);
      }
    };

    fetchCandidates();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (editingCandidate) {
        // Edit existing candidate
        const response = await axios.put(`/api/candidates/${editingCandidate._id}`, data);
        setCandidates(candidates.map(candidate => candidate._id === editingCandidate._id ? response.data : candidate));
        setEditingCandidate(null);
      } else {
        // Add new candidate
        const response = await axios.post('/api/candidates', data);
        setCandidates([...candidates, response.data]);
      }
      reset(); // Clear the form
    } catch (error) {
      console.error('Error saving candidate', error);
    }
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setValue('name', candidate.name);
    setValue('skills', candidate.skills);
    setValue('experience', candidate.experience);
    setValue('location', candidate.location);
  };

  const handleCancelEdit = () => {
    setEditingCandidate(null);
    reset();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input {...register('name', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <input {...register('skills', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input type="number" {...register('experience', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input {...register('location', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">
          {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
        </button>
        {editingCandidate && (
          <button type="button" onClick={handleCancelEdit} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600">
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Candidate List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.skills}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(candidate)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Candidate Overview</h2>
        <CandidateChart candidates={candidates} />
      </div>
    </div>
  );
};

export default AdminDashboard;
