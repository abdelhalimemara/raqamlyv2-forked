import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setEmail(user.email || '');
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setBusinessName(data.business_name || '');
        setPhoneNumber(data.phone_number || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let avatarPath = avatarUrl;

        if (avatarFile) {
          const fileName = `${user.id}/${Date.now()}_${avatarFile.name}`;
          const { data, error } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFile, { upsert: true });

          if (error) throw error;
          
          const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path);
          avatarPath = publicUrl.publicUrl;
        }

        const updates = {
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          phone_number: phoneNumber,
          avatar_url: avatarPath,
          updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) throw error;
        alert("Profile updated successfully!");
        setAvatarUrl(avatarPath);
        setAvatarFile(null);
        fetchProfile(); // Refresh the profile data
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user && avatarUrl) {
        const fileName = avatarUrl.split('/').pop();
        const { error } = await supabase.storage
          .from('avatars')
          .remove([`${user.id}/${fileName}`]);

        if (error) throw error;

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: null })
          .eq('id', user.id);

        if (updateError) throw updateError;

        setAvatarUrl('');
        setAvatarFile(null);
        alert("Avatar deleted successfully!");
        fetchProfile(); // Refresh the profile data
      }
    } catch (error) {
      console.error("Error deleting avatar:", error);
      setError("Failed to delete avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-4">
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <div className="mt-1 flex items-center">
          <img
            src={avatarUrl || '/src/assets/default-avatar.png'}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-var(--primary-color)"
          />
          {avatarUrl && (
            <button
              type="button"
              onClick={handleDeleteAvatar}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          disabled
        />
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          type="submit"
          className="bg-var(--primary-color) text-black py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-var(--primary-color) focus:ring-opacity-50 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        <button
          type="button"
          onClick={handleResetPassword}
          className="text-blue-600 hover:underline"
          disabled={loading}
        >
          Reset Password
        </button>
      </div>
      {loading && <p className="mt-4 text-center text-gray-600">Updating profile...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </form>
  );
};

export default Profile;