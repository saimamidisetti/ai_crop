import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Sprout } from 'lucide-react';

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={session ? '/dashboard' : '/'} className="flex items-center gap-2 text-primary-600">
              <Sprout className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900">CropCare AI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
                <Link to="/history" className="text-gray-600 hover:text-primary-600 font-medium">History</Link>
                <span className="text-sm text-gray-500 hidden sm:block">{session.user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
