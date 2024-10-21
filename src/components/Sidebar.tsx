import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase, ensureValidSession } from '../supabaseClient';

interface Profile {
  first_name: string;
  last_name: string;
  plan: string;
  avatar_url: string;
}

const Sidebar: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      await ensureValidSession();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, plan, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/ai-library', label: 'AI Library', icon: '📚' },
    { path: '/products', label: 'Products', icon: '🛍️' },
    { path: '/campaigns', label: 'Campaigns', icon: '📢' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <img
            src="/src/assets/logo/Logo.svg"
            alt="Raqamly.ai"
            className="h-8 w-auto"
          />
        )}
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>
      <nav className="flex-grow mt-8 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : profile ? (
          <div className="flex items-center">
            <img
              src={profile.avatar_url || '/src/assets/default-avatar.png'}
              alt="Profile"
              className="h-10 w-10 rounded-full mr-3"
            />
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">{`${profile.first_name} ${profile.last_name}`}</p>
                <p className="text-xs text-gray-500">{profile.plan}</p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="ml-auto bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
            >
              🚪
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;