import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { popupAPI } from '../../services/api';

const fields = [
  { name: 'title', label: 'Popup Title', type: 'text', required: true },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'content', label: 'Content', type: 'textarea', rows: 3 },
  { name: 'link', label: 'Button Link', type: 'text', placeholder: '/admissions' },
  { name: 'startDate', label: 'Start Date', type: 'date' },
  { name: 'endDate', label: 'End Date', type: 'date' },
  { name: 'isActive', label: 'Active', type: 'boolean', default: true },
];

const columns = [
  { key: 'image', label: 'Image', render: (i) => i.image ? <img src={i.image} alt="" className="w-16 h-10 object-cover rounded" /> : '—' },
  { key: 'title', label: 'Title' },
  { key: 'isActive', label: 'Status', render: (i) => i.isActive ? 'Active' : 'Hidden' },
];

const PopupManagement = () => (
  <ResourceManager title="Homepage Popup" api={popupAPI} fields={fields} columns={columns} />
);

export default PopupManagement;
