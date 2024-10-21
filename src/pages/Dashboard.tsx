import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Dummy data for the dashboard
  const stats = [
    { label: 'Total Revenue', value: '$12,345' },
    { label: 'Total Orders', value: '1,234' },
    { label: 'Total Products', value: '56' },
    { label: 'Avg. Order Value', value: '$123' },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', date: '2023-05-15', total: '$123.45', status: 'Completed' },
    { id: '2', customer: 'Jane Smith', date: '2023-05-14', total: '$98.76', status: 'Processing' },
    { id: '3', customer: 'Bob Johnson', date: '2023-05-13', total: '$234.56', status: 'Shipped' },
  ];

  const topProducts = [
    { name: 'Product A', sales: 123, revenue: '$1,234' },
    { name: 'Product B', sales: 98, revenue: '$987' },
    { name: 'Product C', sales: 76, revenue: '$765' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-1">{stat.label}</h2>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/orders" className="text-blue-600 hover:underline mt-4 inline-block">View all orders</Link>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Product Name</th>
                <th className="pb-2">Sales</th>
                <th className="pb-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{product.name}</td>
                  <td>{product.sales}</td>
                  <td>{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">View all products</Link>
      </div>
    </div>
  );
};

export default Dashboard;