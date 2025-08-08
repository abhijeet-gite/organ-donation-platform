import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DonorRegistration from './pages/DonorRegistration';
import SearchDonors from './pages/SearchDonors';
import Dashboard from './pages/Dashboard';
import AdminDonorList from './pages/AdminDonorList';
import DonorProfile from './pages/DonorProfile';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<DonorRegistration />} />
        <Route path="/search" element={<SearchDonors />} />
    
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/donors" element={<AdminDonorList />} />
        <Route path="/donor/:id" element={<DonorProfile />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



