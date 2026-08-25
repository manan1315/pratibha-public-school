import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { newsAPI } from '../../services/api';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'content', label: 'Content', type: 'textarea', rows: 6, required: true },
  { name: 'image', label: 'Featured Image', type: 'image' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'category', label: 'Category', type: 'select', default: 'General',
    options: ['General', 'Academics', 'Events', 'Sports', 'Infrastructure', 'Achievements'] },
  { name: 'isFeatured', label: 'Show on homepage', type: 'boolean', default: false },
  { name: 'isActive', label: 'Published', type: 'boolean', default: true },
];

const columns = [
  { key: 'image', label: 'Image', render: (i) => i.image ? <img src={i.image} alt="" className="w-16 h-10 object-cover rounded" /> : '—' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Date', render: (i) => i.date ? new Date(i.date).toLocaleDateString('en-IN') : '—' },
  { key: 'isFeatured', label: 'Homepage', render: (i) => i.isFeatured ? 'Yes' : 'No' },
];

const NewsManagement = () => (
  <ResourceManager title="News & Articles" api={newsAPI} fields={fields} columns={columns} />
);

export default NewsManagement;
