import React, { useRef, useState } from 'react';
import { uploadAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { FiUpload, FiX } from 'react-icons/fi';

/** Image/file picker that uploads immediately and returns the served URL. */
const FileField = ({ label, value, onChange, accept = 'image/*', hint }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { data } = await uploadAPI.upload(file);
      onChange(data.url);
      toast.success('File uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
    setBusy(false);
    if (ref.current) ref.current.value = '';
  };

  const isImage = value && /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(value);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {value ? (
        <div className="flex items-start gap-3 mb-2">
          {isImage ? (
            <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg border" />
          ) : (
            <div className="w-20 h-20 rounded-lg border flex items-center justify-center text-xs text-gray-500 text-center px-1">
              File
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 break-all">{value}</p>
            <button
              type="button"
              onClick={() => onChange('')}
              className="mt-1 text-xs text-red-600 hover:underline inline-flex items-center gap-1"
            >
              <FiX size={12} /> Remove
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL, or upload a file"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]"
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 inline-flex items-center gap-1 whitespace-nowrap disabled:opacity-60"
        >
          <FiUpload size={14} /> {busy ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <input ref={ref} type="file" accept={accept} onChange={pick} className="hidden" />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
};

/** Renders one form control from a field descriptor. */
const Field = ({ field, value, onChange }) => {
  const base =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]';

  const label = (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {field.label}
      {field.required && <span className="text-red-500"> *</span>}
    </label>
  );

  switch (field.type) {
    case 'image':
    case 'file':
      return (
        <FileField
          label={field.label}
          value={value}
          onChange={onChange}
          accept={field.type === 'image' ? 'image/*' : '.pdf,.doc,.docx,image/*'}
          hint={field.hint}
        />
      );

    case 'textarea':
      return (
        <div>
          {label}
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            rows={field.rows || 4}
            placeholder={field.placeholder}
            className={base}
          />
        </div>
      );

    case 'number':
      return (
        <div>
          {label}
          <input
            type="number"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            className={base}
          />
        </div>
      );

    case 'date':
      return (
        <div>
          {label}
          <input
            type="date"
            value={value ? String(value).slice(0, 10) : ''}
            onChange={(e) => onChange(e.target.value)}
            className={base}
          />
        </div>
      );

    case 'select':
      return (
        <div>
          {label}
          <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={base}>
            <option value="">-- select --</option>
            {(field.options || []).map((o) => {
              const val = typeof o === 'string' ? o : o.value;
              const lbl = typeof o === 'string' ? o : o.label;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        </div>
      );

    case 'boolean':
      return (
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={value !== false && value !== undefined ? !!value : false}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 accent-[#1a237e]"
          />
          <span className="text-sm text-gray-700">{field.label}</span>
        </label>
      );

    case 'list':
      return (
        <div>
          {label}
          <textarea
            value={Array.isArray(value) ? value.join('\n') : value ?? ''}
            onChange={(e) =>
              onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
            }
            rows={field.rows || 4}
            placeholder={field.placeholder || 'One item per line'}
            className={base}
          />
          <p className="text-xs text-gray-400 mt-1">One item per line</p>
        </div>
      );

    default:
      return (
        <div>
          {label}
          <input
            type={field.type === 'email' ? 'email' : 'text'}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={base}
          />
        </div>
      );
  }
};

export default Field;
