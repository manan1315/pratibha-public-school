import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiDownload, FiRefreshCw, FiMail, FiCheck } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import { enquiryAPI } from '../../services/api';

const EnquiryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await enquiryAPI.getAll();
      setItems(data);
    } catch {
      toast.error('Failed to load enquiries');
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (item) => {
    try {
      await enquiryAPI.update(item._id, { isRead: !item.isRead });
      await load();
    } catch {
      toast.error('Update failed');
    }
  };

  const saveNote = async () => {
    try {
      await enquiryAPI.update(open._id, { notes: note, isRead: true });
      toast.success('Note saved');
      setOpen(null);
      await load();
    } catch {
      toast.error('Could not save note');
    }
  };

  const remove = async (item) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await enquiryAPI.delete(item._id);
      toast.success('Deleted');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const exportCSV = () => {
    if (!items.length) return toast.info('Nothing to export');
    const head = ['Date', 'Student', 'Parent', 'Email', 'Phone', 'Class', 'Message', 'Read', 'Notes'];
    const rows = items.map((i) => [
      new Date(i.createdAt).toLocaleString('en-IN'),
      i.studentName, i.parentName, i.email, i.phone, i.class,
      (i.message || '').replace(/[\r\n]+/g, ' '),
      i.isRead ? 'Yes' : 'No',
      (i.notes || '').replace(/[\r\n]+/g, ' '),
    ]);
    const csv = [head, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV downloaded');
  };

  const shown = filter === 'unread' ? items.filter((i) => !i.isRead)
    : filter === 'read' ? items.filter((i) => i.isRead)
    : items;

  const unread = items.filter((i) => !i.isRead).length;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admission Enquiries</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {loading ? 'Loading...' : `${items.length} total • ${unread} unread`}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]">
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            <button onClick={load} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" title="Refresh">
              <FiRefreshCw size={16} />
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0d1452]">
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'Student', 'Parent', 'Contact', 'Class', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">{h}</th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">Loading...</td></tr>
                ) : shown.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    No enquiries {filter !== 'all' ? `marked as ${filter}` : 'yet'}. Submissions from the website Admissions form appear here.
                  </td></tr>
                ) : (
                  shown.map((i) => (
                    <tr key={i._id} className={`hover:bg-gray-50 ${!i.isRead ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{new Date(i.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{i.studentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{i.parentName}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        <a href={`tel:${i.phone}`} className="block hover:text-[#1a237e]">{i.phone}</a>
                        <a href={`mailto:${i.email}`} className="block hover:text-[#1a237e]">{i.email}</a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{i.class}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${i.isRead ? 'bg-gray-200 text-gray-600' : 'bg-red-100 text-red-600 font-semibold'}`}>
                          {i.isRead ? 'Read' : 'NEW'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => { setOpen(i); setNote(i.notes || ''); }} className="p-2 text-[#1a237e] hover:bg-blue-50 rounded-lg" title="View details">
                          <FiMail size={16} />
                        </button>
                        <button onClick={() => toggleRead(i)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg ml-1" title={i.isRead ? 'Mark unread' : 'Mark read'}>
                          <FiCheck size={16} />
                        </button>
                        <button onClick={() => remove(i)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-1" title="Delete">
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

        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Enquiry Details</h2>
              <dl className="space-y-2 text-sm mb-4">
                {[
                  ['Student', open.studentName], ['Parent', open.parentName],
                  ['Email', open.email], ['Phone', open.phone], ['Class', open.class],
                  ['Received', new Date(open.createdAt).toLocaleString('en-IN')],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="text-gray-500 w-24 shrink-0">{k}</dt>
                    <dd className="text-gray-800 font-medium">{v || '—'}</dd>
                  </div>
                ))}
                <div className="flex gap-3">
                  <dt className="text-gray-500 w-24 shrink-0">Message</dt>
                  <dd className="text-gray-800">{open.message || '—'}</dd>
                </div>
              </dl>
              <label className="block text-sm font-medium text-gray-700 mb-1">Internal notes</label>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Called on 12 Dec, visiting Saturday"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
              <div className="flex gap-3 mt-4">
                <button onClick={saveNote} className="flex-1 bg-[#1a237e] text-white py-2.5 rounded-lg hover:bg-[#0d1452]">Save & mark read</button>
                <button onClick={() => setOpen(null)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnquiryManagement;
