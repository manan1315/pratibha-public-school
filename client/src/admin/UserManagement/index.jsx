import React, { useState } from 'react';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiUser, FiMail } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';

const UserManagement = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) return toast.error('New password must be at least 6 characters');
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success('Password changed successfully');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

        {/* Profile card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Admin Profile</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <FiUser className="text-[#1a237e]" />
              <span className="text-gray-500 w-20">Name</span>
              <span className="font-medium text-gray-800">{user?.name || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-[#1a237e]" />
              <span className="text-gray-500 w-20">Email</span>
              <span className="font-medium text-gray-800">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiLock className="text-[#1a237e]" />
              <span className="text-gray-500 w-20">Role</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {user?.role || 'admin'}
              </span>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-bold text-gray-800 mb-4">Change Password</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={onChange}
              placeholder="Current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]"
              required
            />
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
              placeholder="New password (min 6 characters)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1a237e] text-white px-6 py-2 rounded-lg hover:bg-[#0d1452] transition-colors disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
