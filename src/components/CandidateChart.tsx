// src/components/CandidateChart.tsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Candidate as CandidateType } from '../types';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface Props {
  candidates: CandidateType[];
}

const CandidateChart: React.FC<Props> = ({ candidates }) => {
  const skills = candidates.map(candidate => candidate.skills);
  const skillCounts = skills.reduce((acc: Record<string, number>, skill: string) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(skillCounts),
    datasets: [
      {
        data: Object.values(skillCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-64 h-64"> {/* Use Tailwind classes for width and height */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default CandidateChart;
