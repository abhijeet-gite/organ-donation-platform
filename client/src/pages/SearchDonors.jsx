

// src/pages/SearchDonors.jsx

// src/pages/SearchDonors.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchDonors = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/donors');
        setDonors(res.data || []);
      } catch (err) {
        console.error('Error fetching donors:', err);
      }
    };

    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const name = donor.name || '';
    const city = donor.city || '';
    const group = donor.bloodGroup || '';

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup = bloodGroup ? group === bloodGroup : true;

    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Donors</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or city"
          className="border p-2 rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredDonors.length === 0 ? (
          <li className="text-gray-500">No donors found.</li>
        ) : (
          filteredDonors.map((donor) => (
            <li key={donor._id || donor.id}>
              <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{donor.name}</h2>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>City: {donor.city}</p>
                
                <Link
                  to={`/donor/${donor.id}`}
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Profile
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchDonors;



