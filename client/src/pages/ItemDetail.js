import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';


const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  const fetchItem = useCallback(async () => {
  try {
    setLoading(true);
    const response = await api.get(`/items/${id}`);
    setItem(response.data.data);
  } catch (error) {
    console.error('Error fetching item:', error);
    alert('Item not found');
    navigate('/items');
  } finally {
    setLoading(false);
  }
}, [id, navigate]);

useEffect(() => {
  fetchItem();
}, [fetchItem]);

  const handleClaim = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to claim this item?')) {
      try {
        setClaiming(true);
        await api.post(`/items/${id}/claim`);
        alert('Item claimed successfully! The owner will be notified.');
        fetchItem(); // Refresh item data
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to claim item');
      } finally {
        setClaiming(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      claimed: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || styles.active;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const isOwner = user && user.id === item.user._id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary-600 hover:text-primary-700 flex items-center"
        >
          ← Back to items
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-8xl">
              {item.category === 'Electronics' && '📱'}
              {item.category === 'Clothing' && '👕'}
              {item.category === 'Accessories' && '⌚'}
              {item.category === 'Documents' && '📄'}
              {item.category === 'Keys' && '🔑'}
              {item.category === 'Bags' && '👜'}
              {item.category === 'Jewelry' && '💍'}
              {item.category === 'Books' && '📚'}
              {item.category === 'Pets' && '🐾'}
              {!['Electronics', 'Clothing', 'Accessories', 'Documents', 'Keys', 'Bags', 'Jewelry', 'Books', 'Pets'].includes(item.category) && '📦'}
            </span>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.type === 'lost' ? '🔍 Lost Item' : '✅ Found Item'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h1>
                <p className="text-gray-500">
                  Category: {item.category}
                </p>
              </div>

              {isOwner && (
                <Link
                  to={`/items/${item._id}/edit`}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </Link>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                <p className="text-gray-900">📍 {item.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Date {item.type === 'lost' ? 'Lost' : 'Found'}
                </h3>
                <p className="text-gray-900">
                  📅 {new Date(item.dateLostOrFound).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Reported On</h3>
                <p className="text-gray-900">
                  {new Date(item.dateReported).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Reported By</h3>
                <p className="text-gray-900">👤 {item.user.name}</p>
              </div>
            </div>

            {/* Contact Information */}
            {item.contactInfo && (item.contactInfo.name || item.contactInfo.phone || item.contactInfo.email) && (
              <div className="border-t pt-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {item.contactInfo.name && (
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {item.contactInfo.name}
                    </p>
                  )}
                  {item.contactInfo.phone && (
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> {item.contactInfo.phone}
                    </p>
                  )}
                  {item.contactInfo.email && (
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {item.contactInfo.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Verification Details (Only show to owner) */}
            {isOwner && item.verificationDetails && (
              <div className="border-t pt-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Verification Details (Private)
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 mb-2">
                    ⚠️ Only visible to you. Use this to verify ownership when someone claims the item.
                  </p>
                  <p className="text-gray-700">{item.verificationDetails}</p>
                </div>
              </div>
            )}

            {/* Claim Button */}
            {!isOwner && item.status === 'active' && (
              <div className="border-t pt-6">
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 font-medium disabled:opacity-50"
                >
                  {claiming ? 'Claiming...' : `Claim This ${item.type === 'lost' ? 'Lost' : 'Found'} Item`}
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  The owner will be notified and can contact you
                </p>
              </div>
            )}

            {item.status === 'claimed' && item.claimedBy && (
              <div className="border-t pt-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    ⚠️ This item has been claimed by {item.claimedBy.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;