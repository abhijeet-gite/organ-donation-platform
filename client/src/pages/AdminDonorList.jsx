// pages/AdminDonorList.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDonors = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/donors');
      setDonors(res.data);
      setFilteredDonors(res.data);
    } catch (err) {
      console.error('Error fetching donors', err);
      toast.error('Failed to fetch donors!');
    }
  };

  const deleteDonor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/donors/${id}`);
      const updatedDonors = donors.filter((donor) => donor.id !== id);
      setDonors(updatedDonors);
      setFilteredDonors(updatedDonors);
      toast.success('Donor deleted successfully!'); // ✅ Toast instead of alert
    } catch (err) {
      console.error('Error deleting donor', err);
      toast.error('Failed to delete donor!');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = donors.filter((donor) =>
      (donor.fullName && donor.fullName.toLowerCase().includes(value)) ||
      (donor.bloodGroup && donor.bloodGroup.toLowerCase().includes(value)) ||
      (donor.city && donor.city.toLowerCase().includes(value))
    );

    setFilteredDonors(filtered);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Registered Donors</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, city or blood group"
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
      />

      {filteredDonors.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td className="p-2 border">{donor.fullName}</td>
                <td className="p-2 border">{donor.email}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.city}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteDonor(donor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500 mt-4">No donors found.</p>
      )}

      {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AdminDonorList;





