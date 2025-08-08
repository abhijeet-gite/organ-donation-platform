const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
        Save Lives, Donate Blood
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-xl">
        Your donation can make a big difference. Join our mission to connect donors with those in need.
      </p>
      <div className="space-x-4">
        <a
          href="/register"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
        >
          Become a Donor
        </a>
        <a
          href="/search"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded"
        >
          Find a Donor
        </a>
      </div>
    </div>
  );
};

export default Home;
