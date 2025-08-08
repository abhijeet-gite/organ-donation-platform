import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">OneLife</h1>
        <ul className="flex space-x-6 text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/search" className="hover:underline">Search Donors</Link></li>
           


          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/donors" className="hover:underline">All Donors</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


