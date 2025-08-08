//components/Footer.jsx
// components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t shadow-inner">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">BloodConnect</span>. All rights reserved.
          <br />
          Developed by <span className="font-medium">Abhijeet Gite</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

