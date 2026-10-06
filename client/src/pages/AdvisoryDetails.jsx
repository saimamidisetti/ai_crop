import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../lib/axios';
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle2, ShieldAlert, Printer } from 'lucide-react';

export default function AdvisoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAdvisory();
  }, [id]);

  const fetchAdvisory = async () => {
    try {
      const response = await api.get(`/advisories/${id}`);
      setAdvisory(response.data);
    } catch (err) {
      setError('Failed to load advisory details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this advisory?')) return;
    
    setDeleting(true);
    try {
      await api.delete(`/advisories/${id}`);
      navigate('/history');
    } catch (err) {
      setError('Failed to delete advisory.');
      setDeleting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading advisory...</div>;
  }

  if (error || !advisory) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">{error || 'Advisory not found.'}</p>
        <Link to="/dashboard" className="text-primary-600 hover:underline mt-4 inline-block">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0 print:max-w-full">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link to="/dashboard" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600"
          >
            <Printer className="mr-1 h-4 w-4" />
            Print Report
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold leading-6 text-gray-900">{advisory.crop_name} Advisory</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {advisory.location} &bull; {advisory.growth_stage} stage &bull; {new Date(advisory.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="px-4 py-5 sm:p-6 space-y-8">
          
          {/* User Input Summary */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900">Reported Problem:</h4>
            <p className="mt-1 text-sm text-gray-600">{advisory.problem_description}</p>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advisory.weather_condition && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Weather:</h4>
                  <p className="mt-1 text-sm text-gray-600">{advisory.weather_condition}</p>
                </div>
              )}
              {advisory.soil_type && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Soil Type:</h4>
                  <p className="mt-1 text-sm text-gray-600">{advisory.soil_type}</p>
                </div>
              )}
            </div>

            {advisory.additional_information && (
              <>
                <h4 className="text-sm font-medium text-gray-900 mt-4">Additional Info:</h4>
                <p className="mt-1 text-sm text-gray-600">{advisory.additional_information}</p>
              </>
            )}
          </div>

          {/* AI Analysis */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5 text-primary-600" />
              Analysis
            </h4>
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{advisory.analysis}</p>
          </div>

          {/* Possible Causes */}
          {advisory.possible_causes?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                Possible Causes
              </h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                {advisory.possible_causes.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Actions */}
          {advisory.recommended_actions?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                Recommended Actions
              </h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                {advisory.recommended_actions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Prevention Tips */}
          {advisory.prevention_tips?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900">Prevention Tips</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                {advisory.prevention_tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warning */}
          {advisory.warning && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important Note:</strong> {advisory.warning}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
