import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lost Something? Found Something?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with your community to reunite lost items with their owners.
            Report lost items or help return found items quickly and easily.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/items?type=lost"
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              🔍 Browse Lost Items
            </Link>
            <Link
              to="/items?type=found"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              ✅ Browse Found Items
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="mt-6">
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create an account to report items →
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Report Items</h3>
            <p className="text-gray-600">
              Quickly report lost or found items with detailed descriptions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🔎</div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-600">
              Filter by category, location, and date to find matches
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Connect & Claim</h3>
            <p className="text-gray-600">
              Securely connect with owners to return items
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">1000+</div>
              <div className="text-gray-600 mt-2">Items Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">750+</div>
              <div className="text-gray-600 mt-2">Items Reunited</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-2">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;