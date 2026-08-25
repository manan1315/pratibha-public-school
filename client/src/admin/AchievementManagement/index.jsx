import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { achievementAPI } from '../../services/api';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'studentName', label: 'Student / Team Name', type: 'text' },
  { name: 'category', label: 'Category', type: 'select', default: 'Academic',
    options: ['Academic', 'Sports', 'Cultural', 'School Award', 'Other'] },
  { name: 'year', label: 'Year', type: 'text', placeholder: '2025' },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'image', label: 'Image', render: (i) => i.image ? <img src={i.image} alt="" className="w-16 h-10 object-cover rounded" /> : '—' },
  { key: 'title', label: 'Title' },
  { key: 'studentName', label: 'Student' },
  { key: 'category', label: 'Category' },
  { key: 'year', label: 'Year' },
];

const AchievementManagement = () => (
  <ResourceManager title="Achievements" api={achievementAPI} fields={fields} columns={columns} />
);

export default AchievementManagement;
