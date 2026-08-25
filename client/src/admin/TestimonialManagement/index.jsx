import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { testimonialAPI } from '../../services/api';

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'relation', label: 'Relation', type: 'text', required: true, placeholder: 'Parent, Class 8' },
  { name: 'quote', label: 'Testimonial', type: 'textarea', rows: 4, required: true },
  { name: 'photo', label: 'Photo', type: 'image' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5, default: 5 },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'photo', label: 'Photo', render: (i) => i.photo ? <img src={i.photo} alt="" className="w-10 h-10 object-cover rounded-full" /> : '—' },
  { key: 'name', label: 'Name' },
  { key: 'relation', label: 'Relation' },
  { key: 'rating', label: 'Rating', render: (i) => '*'.repeat(i.rating || 0) },
];

const TestimonialManagement = () => (
  <ResourceManager title="Testimonials" api={testimonialAPI} fields={fields} columns={columns} />
);

export default TestimonialManagement;
