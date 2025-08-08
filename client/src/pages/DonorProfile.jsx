// src/pages/DonorProfile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DonorProfile = () => {
  const { id } = useParams(); // ✅ Get donor ID from URL
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/donors/${id}`);
        setDonor(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Unable to fetch donor data.", err);
        setError("Unable to fetch donor data.");
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Donor Profile</h2>
      <p><strong>Full Name:</strong> {donor.fullName}</p>
      <p><strong>Age:</strong> {donor.age}</p>
      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
      <p><strong>Organs:</strong> {donor.organs.join(", ")}</p>
      <p><strong>Email:</strong> {donor.email}</p>
      <p><strong>Phone:</strong> {donor.phone}</p>
      <p><strong>City:</strong> {donor.city}</p>
      <p><strong>State:</strong> {donor.state}</p>
    </div>
  );
};

export default DonorProfile;




