import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

const advisorySchema = z.object({
  cropName: z.string().min(2, "Crop name must be at least 2 characters"),
  growthStage: z.string().min(2, "Please select a growth stage"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  problemDescription: z.string().min(10, "Description must be at least 10 characters"),
  additionalInformation: z.string().optional()
});

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentAdvisories, setRecentAdvisories] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(advisorySchema)
  });

  useEffect(() => {
    fetchRecentAdvisories();
  }, []);

  const fetchRecentAdvisories = async () => {
    try {
      const response = await api.get('/advisories');
      setRecentAdvisories(response.data.slice(0, 3)); // Get top 3
    } catch (err) {
      console.error("Failed to fetch advisories:", err);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/advisories', data);
      reset();
      navigate(`/advisory/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate advisory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-5">Get New Advisory</h3>
              
              {error && (
                <div className="mb-4 bg-red-50 p-4 rounded-md">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Crop Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('cropName')}
                        placeholder="e.g. Tomato"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      />
                      {errors.cropName && <p className="mt-1 text-sm text-red-600">{errors.cropName.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Growth Stage</label>
                    <div className="mt-2">
                      <select
                        {...register('growthStage')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      >
                        <option value="">Select a stage...</option>
                        <option value="Seedling">Seedling</option>
                        <option value="Vegetative">Vegetative</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Fruiting">Fruiting</option>
                        <option value="Maturity">Maturity</option>
                        <option value="Harvest">Harvest</option>
                      </select>
                      {errors.growthStage && <p className="mt-1 text-sm text-red-600">{errors.growthStage.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Weather Condition (Optional)</label>
                    <div className="mt-2">
                      <select
                        {...register('weatherCondition')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      >
                        <option value="">Select weather...</option>
                        <option value="Sunny/Hot">Sunny / Hot</option>
                        <option value="Humid/Rainy">Humid / Rainy</option>
                        <option value="Cold/Frost">Cold / Frost</option>
                        <option value="Dry/Drought">Dry / Drought</option>
                        <option value="Windy">Windy</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Soil Type (Optional)</label>
                    <div className="mt-2">
                      <select
                        {...register('soilType')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      >
                        <option value="">Select soil...</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Clay">Clay</option>
                        <option value="Loam">Loam</option>
                        <option value="Red Soil">Red Soil</option>
                        <option value="Black Soil">Black Soil</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('location')}
                        placeholder="e.g. Andhra Pradesh"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      />
                      {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Problem Description</label>
                    <div className="mt-2">
                      <textarea
                        {...register('problemDescription')}
                        rows={3}
                        placeholder="e.g. Leaves are turning yellow and developing brown spots."
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      />
                      {errors.problemDescription && <p className="mt-1 text-sm text-red-600">{errors.problemDescription.message}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Additional Information (Optional)</label>
                    <div className="mt-2">
                      <textarea
                        {...register('additionalInformation')}
                        rows={2}
                        placeholder="e.g. Problem started one week ago."
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md bg-primary-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing your crop...' : 'Get AI Advisory'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: History Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-5">Recent Advisories</h3>
              
              {recentAdvisories.length === 0 ? (
                <p className="text-sm text-gray-500">No recent advisories. Get started by submitting the form.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentAdvisories.map((advisory) => (
                    <li key={advisory.id} className="py-4">
                      <Link to={`/advisory/${advisory.id}`} className="block hover:bg-gray-50 -m-2 p-2 rounded-md transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{advisory.crop_name}</p>
                            <p className="text-sm text-gray-500 truncate">{new Date(advisory.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {recentAdvisories.length > 0 && (
                <div className="mt-6">
                  <Link
                    to="/history"
                    className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View all history
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
