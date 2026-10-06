import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { FileText, ArrowLeft, Trash2 } from 'lucide-react';

export default function History() {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdvisories();
  }, []);

  const fetchAdvisories = async () => {
    try {
      const response = await api.get('/advisories');
      setAdvisories(response.data);
    } catch (err) {
      setError('Failed to fetch advisory history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault(); // Prevent navigating to details page
    if (!window.confirm('Are you sure you want to delete this advisory?')) return;
    
    try {
      await api.delete(`/advisories/${id}`);
      setAdvisories(advisories.filter(adv => adv.id !== id));
    } catch (err) {
      alert('Failed to delete advisory.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading history...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Advisory History</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all your previous crop advisories.</p>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {advisories.length === 0 ? (
              <div className="text-center py-12 bg-white shadow rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No advisories</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new advisory from the dashboard.</p>
                <div className="mt-6">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Crop Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stage</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {advisories.map((advisory) => (
                      <tr key={advisory.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <Link to={`/advisory/${advisory.id}`} className="text-primary-600 hover:text-primary-900">
                            {advisory.crop_name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{advisory.growth_stage}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(advisory.created_at).toLocaleDateString()}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={(e) => handleDelete(advisory.id, e)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
