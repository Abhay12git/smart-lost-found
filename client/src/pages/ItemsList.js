import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || ''
  });

  const categories = [
    'Electronics', 'Clothing', 'Accessories', 'Documents',
    'Keys', 'Bags', 'Jewelry', 'Books', 'Pets', 'Other'
  ];

 useEffect(() => {
  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams);

      const response = await api.get(`/items?${params.toString()}`);
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchItems();
}, [searchParams]); // Only depends on searchParams
  
const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.search) params.set('search', newFilters.search);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ type: '', category: '', search: '' });
    setSearchParams({});
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      claimed: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || styles.active;
  };

  const getTypeBadge = (type) => {
    return type === 'lost' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
          <p className="mt-2 text-gray-600">
            Search through lost and found items in your community
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search items..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.type || filters.category || filters.search) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.type && (
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  Type: {filters.type}
                </span>
              )}
              {filters.category && (
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  Category: {filters.category}
                </span>
              )}
              {filters.search && (
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  Search: "{filters.search}"
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No items found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {items.length} item{items.length !== 1 ? 's' : ''}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link
                  key={item._id}
                  to={`/items/${item._id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-6xl">
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

                  <div className="p-4">
                    {/* Badges */}
                    <div className="flex gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadge(item.type)}`}>
                        {item.type === 'lost' ? '🔍 Lost' : '✅ Found'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">📍</span>
                        {item.location}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">📅</span>
                        {new Date(item.dateLostOrFound).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">🏷️</span>
                        {item.category}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsList;