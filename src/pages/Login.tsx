import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-var(--background-color)">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-semibold text-center mb-2">Sign In</h1>
        <p className="text-center text-gray-600 mb-8">
          New to Our Product? <Link to="/signup" className="text-blue-600 hover:underline">Create an Account</Link>
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepSignedIn"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-900">
                Keep me signed in
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-black py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
          >
            Sign in
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 mb-4">Or sign in using:</p>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <img src="/src/assets/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <img src="/src/assets/facebook-icon.svg" alt="Facebook" className="h-5 w-5 mr-2" />
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;