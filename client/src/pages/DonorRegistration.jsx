//pages/DonorRegistration.jsx

// src/pages/DonorRegistration.jsx
import { useState } from 'react';
import axios from 'axios';

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    city: '',
    phone: '',
    dob: '',
    gender: '',
    lastDonation: '',
    agree: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const cities = ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur'];
  const genders = ['Male', 'Female', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      alert('❌ Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (!formData.agree) {
      alert('⚠️ Please accept the terms and conditions.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8080/api/donors', formData);
      if (response.status === 201 || response.status === 200) {
        alert('✅ Donor registered successfully! A confirmation email has been sent.');
        setFormData({
          name: '',
          email: '',
          bloodGroup: '',
          city: '',
          phone: '',
          dob: '',
          gender: '',
          lastDonation: '',
          agree: false,
        });
      } else {
        alert('⚠️ Failed to register donor. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Error: Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl border"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">🩸 Donor Registration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <input
          type="date"
          name="lastDonation"
          value={formData.lastDonation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Last Donation Date"
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-sm text-gray-700">I agree to the terms and conditions</label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition ${
          submitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {submitting ? 'Registering...' : 'Register Now'}
      </button>
    </form>
  );
};

export default DonorRegistration;





