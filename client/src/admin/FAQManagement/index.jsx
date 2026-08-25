import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { faqAPI } from '../../services/api';

const fields = [
  { name: 'question', label: 'Question', type: 'text', required: true },
  { name: 'answer', label: 'Answer', type: 'textarea', rows: 4, required: true },
  { name: 'category', label: 'Category', type: 'select', default: 'General',
    options: ['General', 'Admissions', 'Academics', 'Fees', 'Transport', 'Other'] },
  { name: 'order', label: 'Display Order', type: 'number', default: 1 },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'question', label: 'Question' },
  { key: 'category', label: 'Category' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', render: (i) => i.isActive ? 'Active' : 'Hidden' },
];

const FAQManagement = () => (
  <ResourceManager title="FAQs" api={faqAPI} fields={fields} columns={columns} />
);

export default FAQManagement;
