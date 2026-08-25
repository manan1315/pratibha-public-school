import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { sliderAPI } from '../../services/api';

const fields = [
  { name: 'image', label: 'Slide Image', type: 'image', required: true },
  { name: 'heading', label: 'Heading', type: 'text', required: true, placeholder: 'Welcome to Pratibha Public School' },
  { name: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
  { name: 'buttonText', label: 'Button Text', type: 'text', default: 'Learn More' },
  { name: 'buttonLink', label: 'Button Link', type: 'text', default: '/admissions', hint: 'e.g. /admissions' },
  { name: 'order', label: 'Display Order', type: 'number', default: 1 },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'image', label: 'Image', render: (i) => i.image ? <img src={i.image} alt="" className="w-16 h-10 object-cover rounded" /> : '—' },
  { key: 'heading', label: 'Heading' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', render: (i) => <span className={`px-2 py-0.5 rounded-full text-xs ${i.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{i.isActive ? 'Active' : 'Hidden'}</span> },
];

const SliderManagement = () => (
  <ResourceManager title="Hero Sliders" api={sliderAPI} fields={fields} columns={columns} />
);

export default SliderManagement;
