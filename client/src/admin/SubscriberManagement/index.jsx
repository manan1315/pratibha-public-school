import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiDownload, FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import { subscriberAPI } from '../../services/api';

const SubscriberManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await subscriberAPI.getAll();
      setItems(data);
    } catch {
      toast.error('Failed to load subscribers');
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (item) => {
    if (!window.confirm(`Remove ${item.email}?`)) return;
    try {
      await subscriberAPI.delete(item._id);
      toast.success('Subscriber removed');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const exportCSV = () => {
    if (!items.length) return toast.info('Nothing to export');
    const csv = [['Email', 'Subscribed On'], ...items.map((i) => [i.email, new Date(i.subscribedAt || i.createdAt).toLocaleString('en-IN')])]
      .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV downloaded');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
            <p className="text-xs text-gray-500 mt-0.5">{loading ? 'Loading...' : `${items.length} subscriber${items.length === 1 ? '' : 's'}`}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" title="Refresh">
              <FiRefreshCw size={16} />
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0d1452]">
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subscribed On</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={3} className="px-4 py-10 text-center text-gray-400">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-10 text-center text-gray-400">
                  No subscribers yet. Emails from the homepage newsletter form appear here.
                </td></tr>
              ) : (
                items.map((i) => (
                  <tr key={i._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{i.email}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(i.subscribedAt || i.createdAt).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(i)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Remove">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubscriberManagement;
