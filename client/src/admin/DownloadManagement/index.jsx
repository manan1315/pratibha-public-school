import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { downloadAPI } from '../../services/api';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { name: 'file', label: 'File (PDF/DOC)', type: 'file', required: true },
  { name: 'category', label: 'Category', type: 'select', default: 'General',
    options: ['General', 'Admissions', 'Academics', 'Fees', 'Transport', 'Certificates'] },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'file', label: 'File', render: (i) => i.file ? <a href={i.file} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open</a> : '—' },
];

const DownloadManagement = () => (
  <ResourceManager title="Downloads" api={downloadAPI} fields={fields} columns={columns} />
);

export default DownloadManagement;
