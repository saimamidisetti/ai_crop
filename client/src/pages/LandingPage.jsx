import { Link } from 'react-router-dom';
import { Sprout, ShieldAlert, Leaf } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="mb-8 flex justify-center">
            <Sprout className="h-20 w-20 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            CropCare AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AI-powered guidance for your crops. Get instant, expert-level agricultural advisory based on your crop's symptoms and growth stage.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get Started
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Smart Farming</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to protect your yield
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <ShieldAlert className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Instant Problem Analysis
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Describe what's wrong with your plants, and our AI will analyze the symptoms to identify potential diseases, pests, or nutrient deficiencies.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Actionable Recommendations
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Receive clear, practical steps to address the issue, along with prevention tips to keep your crops healthy in the future.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
