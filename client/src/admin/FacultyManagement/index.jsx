import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { facultyAPI } from '../../services/api';

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', required: true },
  { name: 'photo', label: 'Photo', type: 'image' },
  { name: 'qualification', label: 'Qualification', type: 'text', required: true, placeholder: 'M.Sc. (Physics), B.Ed.' },
  { name: 'designation', label: 'Designation', type: 'text', required: true, placeholder: 'Senior Teacher' },
  { name: 'department', label: 'Department', type: 'text', placeholder: 'Science' },
  { name: 'experience', label: 'Experience', type: 'text', placeholder: '12 years' },
  { name: 'order', label: 'Display Order', type: 'number', default: 1 },
  { name: 'isActive', label: 'Show on website', type: 'boolean', default: true },
];

const columns = [
  { key: 'photo', label: 'Photo', render: (i) => i.photo ? <img src={i.photo} alt="" className="w-10 h-10 object-cover rounded-full" /> : '—' },
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'department', label: 'Department' },
  { key: 'experience', label: 'Experience' },
];

const FacultyManagement = () => (
  <ResourceManager title="Faculty" api={facultyAPI} fields={fields} columns={columns} />
);

export default FacultyManagement;
