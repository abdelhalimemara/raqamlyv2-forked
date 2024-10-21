import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Profile from '../components/Profile';

const Settings = () => {
  const [currentPlan, setCurrentPlan] = useState('Basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.error("Error fetching user plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-semibold mb-6">Settings</h1>

      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
        <Profile />
      </section>

      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Subscription Info</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="mb-4">Current Plan: <strong>{currentPlan}</strong></p>
            <div className="grid grid-cols-3 gap-4">
              {['Basic', 'Premium', 'Enterprise'].map((plan) => (
                <div
                  key={plan}
                  className={`border rounded-lg p-4 ${
                    plan === currentPlan ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">{plan}</h3>
                  <p className="text-sm text-gray-600">
                    {plan === 'Basic' && 'For individuals and small teams'}
                    {plan === 'Premium' && 'For growing businesses'}
                    {plan === 'Enterprise' && 'For large organizations'}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">2023-05-01</td>
              <td className="py-2">Premium Plan - Monthly</td>
              <td className="text-right py-2">$49.99</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">2023-04-01</td>
              <td className="py-2">Premium Plan - Monthly</td>
              <td className="text-right py-2">$49.99</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Settings;