import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../AdminLayout';
import { settingsAPI } from '../../services/api';
import Field from '../components/Field';

const SettingsManagement = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await settingsAPI.get();
        setForm({
          ...data,
          socialLinks: data.socialLinks || {},
          colors: data.colors || {},
        });
      } catch {
        toast.error('Failed to load settings');
      }
    })();
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setNested = (group, k, v) =>
    setForm((f) => ({ ...f, [group]: { ...f[group], [k]: v } }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = form;
      await settingsAPI.update(payload);
      toast.success('Settings saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  if (!form) {
    return (
      <AdminLayout>
        <div className="p-6 text-gray-400">Loading settings...</div>
      </AdminLayout>
    );
  }

  const text = (name, label, placeholder) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        value={form[name] ?? ''}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]"
      />
    </div>
  );

  const social = (name, label) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        value={form.socialLinks[name] ?? ''}
        onChange={(e) => setNested('socialLinks', name, e.target.value)}
        placeholder="https://..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]"
      />
    </div>
  );

  const Card = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <AdminLayout>
      <form onSubmit={save} className="p-6 max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Website Settings</h1>
          <button type="submit" disabled={saving}
            className="bg-[#1a237e] text-white px-6 py-2 rounded-lg hover:bg-[#0d1452] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <Card title="School Identity">
          {text('schoolName', 'School Name')}
          {text('tagline', 'Tagline')}
          <Field field={{ name: 'logo', label: 'Logo', type: 'image' }} value={form.logo} onChange={(v) => set('logo', v)} />
          <Field field={{ name: 'favicon', label: 'Favicon', type: 'image' }} value={form.favicon} onChange={(v) => set('favicon', v)} />
        </Card>

        <Card title="Contact Details">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea rows={2} value={form.address ?? ''} onChange={(e) => set('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {text('phone1', 'Phone 1')}
            {text('phone2', 'Phone 2')}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {text('email', 'Email')}
            {text('website', 'Website')}
          </div>
          { text('workingHours', 'Working Hours', 'Mon - Sat: Primary 7:40 AM - 11:40 AM | Middle & Higher Secondary 7:40 AM - 1:40 PM') }
        </Card>

        <Card title="Social Media Links">
          <div className="grid sm:grid-cols-2 gap-4">
            {social('facebook', 'Facebook')}
            {social('instagram', 'Instagram')}
            {social('youtube', 'YouTube')}
            {social('twitter', 'Twitter / X')}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input value={form.socialLinks.whatsapp ?? ''} onChange={(e) => setNested('socialLinks', 'whatsapp', e.target.value)}
              placeholder="+919111107333"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
          </div>
        </Card>

        <Card title="Theme Colours">
          <div className="grid sm:grid-cols-2 gap-4">
            {['primary', 'secondary'].map((k) => (
              <div key={k}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{k} colour</label>
                <div className="flex gap-2">
                  <input type="color" value={form.colors[k] || '#1a237e'} onChange={(e) => setNested('colors', k, e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer" />
                  <input value={form.colors[k] ?? ''} onChange={(e) => setNested('colors', k, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Links & Banner">
          {text('parentPortalLink', 'Parent Portal Link', 'https://... or /contact')}
          {text('feePaymentLink', 'Fee Payment Link', 'https://...')}
          {text('admissionBannerText', 'Admission Banner Text', 'Admissions Open for Session 2025-26')}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.admissionBannerEnabled !== false}
              onChange={(e) => set('admissionBannerEnabled', e.target.checked)} className="w-4 h-4 accent-[#1a237e]" />
            <span className="text-sm text-gray-700">Show admission banner on homepage</span>
          </label>
        </Card>

        <button type="submit" disabled={saving}
          className="w-full bg-[#1a237e] text-white py-3 rounded-lg hover:bg-[#0d1452] disabled:opacity-60">
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default SettingsManagement;
