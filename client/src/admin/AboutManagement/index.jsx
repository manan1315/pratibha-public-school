import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { aboutAPI } from '../../services/api';

const fields = [
  { name: 'section', label: 'Section', type: 'select', required: true,
    options: [
      { value: 'welcome', label: 'Homepage Welcome' },
      { value: 'vision', label: 'Our Vision' },
      { value: 'mission', label: 'Our Mission' },
      { value: 'ethos', label: 'Ethos & Values' },
      { value: 'society', label: 'Managing Committee' },
      { value: 'pedagogy', label: 'Pedagogy & Assessment' },
      { value: 'curriculum', label: 'Curriculum' },
      { value: 'engagement', label: 'Student Engagement' },
      { value: 'beyond', label: 'Beyond Classroom' },
    ] },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'content', label: 'Content', type: 'textarea', rows: 8, required: true },
  { name: 'image', label: 'Image', type: 'image' },
];

const columns = [
  { key: 'section', label: 'Section' },
  { key: 'title', label: 'Title' },
  { key: 'content', label: 'Preview', render: (i) => (i.content || '').slice(0, 60) + '...' },
];

const AboutManagement = () => (
  <ResourceManager title="About / Page Content" api={aboutAPI} fields={fields} columns={columns} />
);

export default AboutManagement;
