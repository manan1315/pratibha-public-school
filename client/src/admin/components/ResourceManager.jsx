import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSearch, FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import Field from './Field';

/**
 * Full-CRUD admin screen driven by a field schema.
 *
 * props:
 *  title       page heading
 *  api         { getAll|getAllAdmin, create, update, delete }
 *  fields      [{ name, label, type, required, options, ... }]
 *  columns     [{ key, label, render? }] for the table
 *  readOnly    hide create/edit (e.g. subscribers, enquiries list)
 *  singleton   edit one document only (e.g. Settings)
 *  emptyHint   text shown when list is empty
 */
const ResourceManager = ({
  title,
  api,
  fields = [],
  columns = [],
  readOnly = false,
  singleton = false,
  emptyHint = 'No items yet. Click "Add New" to create the first one.',
  extraActions,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [q, setQ] = useState('');

  const blank = useCallback(() => {
    const o = {};
    fields.forEach((f) => {
      o[f.name] =
        f.type === 'boolean' ? (f.default ?? true)
        : f.type === 'list' ? []
        : f.default ?? '';
    });
    return o;
  }, [fields]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const fetcher = api.getAllAdmin || api.getAll;
      const { data } = await fetcher();
      const list = Array.isArray(data) ? data : data ? [data] : [];
      setItems(list);
      if (singleton) {
        const doc = list[0];
        setEditing(doc || null);
        setForm(doc ? { ...blank(), ...doc } : blank());
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load data');
    }
    setLoading(false);
  }, [api, singleton, blank]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(blank());
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...blank(), ...item });
    setShowModal(true);
  };

  const setValue = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const buildPayload = () => {
    const out = {};
    fields.forEach((f) => {
      let v = form[f.name];
      if (f.type === 'number' && v === '') v = undefined;
      if (v !== undefined) out[f.name] = v;
    });
    return out;
  };

  const submit = async (e) => {
    e.preventDefault();

    const missing = fields.filter(
      (f) => f.required && (form[f.name] === '' || form[f.name] === undefined || form[f.name] === null)
    );
    if (missing.length) {
      return toast.error(`Please fill: ${missing.map((m) => m.label).join(', ')}`);
    }

    setSaving(true);
    try {
      const payload = buildPayload();
      if (singleton) {
        await api.update(payload);
        toast.success('Saved successfully');
      } else if (editing) {
        await api.update(editing._id, payload);
        toast.success('Updated successfully');
      } else {
        await api.create(payload);
        toast.success('Created successfully');
      }
      setShowModal(false);
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  const remove = async (item) => {
    if (!window.confirm('Delete this item permanently?')) return;
    try {
      await api.delete(item._id);
      toast.success('Deleted');
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const cols = columns.length
    ? columns
    : [{ key: fields[0]?.name || 'title', label: fields[0]?.label || 'Title' }];

  const filtered = q
    ? items.filter((it) =>
        JSON.stringify(it).toLowerCase().includes(q.toLowerCase())
      )
    : items;

  /* ---------- singleton (Settings) ---------- */
  if (singleton) {
    return (
      <AdminLayout>
        <div className="p-6 max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <form onSubmit={submit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
              {fields.map((f) => (
                <Field key={f.name} field={f} value={form[f.name]} onChange={(v) => setValue(f.name, v)} />
              ))}
              <button
                type="submit"
                disabled={saving}
                className="bg-[#1a237e] text-white px-6 py-2 rounded-lg hover:bg-[#0d1452] disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </AdminLayout>
    );
  }

  /* ---------- list + modal ---------- */
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {loading ? 'Loading...' : `${items.length} item${items.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]"
              />
            </div>
            <button onClick={load} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" title="Refresh">
              <FiRefreshCw size={16} />
            </button>
            {extraActions}
            {!readOnly && (
              <button
                onClick={openCreate}
                className="flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-lg hover:bg-[#0d1452] text-sm whitespace-nowrap"
              >
                <FiPlus /> Add New
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {cols.map((c) => (
                    <th key={c.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={cols.length + 1} className="px-4 py-10 text-center text-gray-400">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={cols.length + 1} className="px-4 py-10 text-center text-gray-400">{q ? 'No matches for your search.' : emptyHint}</td></tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      {cols.map((c) => (
                        <td key={c.key} className="px-4 py-3 text-sm text-gray-700 align-top">
                          {c.render ? c.render(item) : String(item[c.key] ?? '—').slice(0, 90)}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {!readOnly && (
                          <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                            <FiEdit size={16} />
                          </button>
                        )}
                        <button onClick={() => remove(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-1" title="Delete">
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

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl">
                <h2 className="text-lg font-bold text-gray-800">
                  {editing ? 'Edit' : 'Add New'} — {title.replace(' Management', '')}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-700">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={submit} className="px-6 py-5 space-y-4">
                {fields.map((f) => (
                  <Field key={f.name} field={f} value={form[f.name]} onChange={(v) => setValue(f.name, v)} />
                ))}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#1a237e] text-white py-2.5 rounded-lg hover:bg-[#0d1452] disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ResourceManager;
