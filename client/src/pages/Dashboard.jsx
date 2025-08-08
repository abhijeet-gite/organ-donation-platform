// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const StatCard = ({ title, value, bgColor, textColor }) => (
  <div className={`p-6 rounded-xl shadow-lg ${bgColor} text-center`}>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotalDonors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/donors');
        setTotalDonors(res.data.length);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch donors:', err);
        setError('Error fetching donor data');
        setLoading(false);
      }
    };

    fetchTotalDonors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">📊 Admin Dashboard</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading donor data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Total Registered Donors"
            value={totalDonors}
            bgColor="bg-blue-100"
            textColor="text-blue-700"
          />
          <StatCard
            title="Blood Requests (Coming Soon)"
            value="—"
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
          <StatCard
            title="Monthly Reports"
            value="Coming Soon"
            bgColor="bg-green-100"
            textColor="text-green-700"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;


