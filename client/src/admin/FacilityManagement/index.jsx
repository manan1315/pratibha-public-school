import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { facilityAPI } from '../../services/api';

const fields = [
  { name: 'title', label: 'Facility Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4, required: true },
  { name: 'images', label: 'Image URLs', type: 'list', placeholder: 'One image URL per line' },
  { name: 'icon', label: 'Icon key', type: 'select', default: 'monitor',
    options: ['monitor', 'flask', 'cpu', 'book', 'activity', 'truck', 'coffee', 'heart', 'shield'] },
  { name: 'order', label: 'Display Order', type: 'number', default: 1 },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'title', label: 'Facility' },
  { key: 'description', label: 'Description', render: (i) => (i.description || '').slice(0, 70) + '...' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', render: (i) => i.isActive ? 'Active' : 'Hidden' },
];

const FacilityManagement = () => (
  <ResourceManager title="Facilities" api={facilityAPI} fields={fields} columns={columns} />
);

export default FacilityManagement;
