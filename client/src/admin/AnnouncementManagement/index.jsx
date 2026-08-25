import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { announcementAPI } from '../../services/api';

const fields = [
  { name: 'text', label: 'Announcement Text', type: 'textarea', rows: 2, required: true },
  { name: 'link', label: 'Link (optional)', type: 'text', placeholder: '/admissions' },
  { name: 'startDate', label: 'Start Date', type: 'date' },
  { name: 'endDate', label: 'End Date', type: 'date' },
  { name: 'isActive', label: 'Show in ticker', type: 'boolean', default: true },
];

const columns = [
  { key: 'text', label: 'Text' },
  { key: 'link', label: 'Link' },
  { key: 'isActive', label: 'Status', render: (i) => i.isActive ? 'Active' : 'Hidden' },
];

const AnnouncementManagement = () => (
  <ResourceManager title="Announcements (Ticker)" api={announcementAPI} fields={fields} columns={columns} />
);

export default AnnouncementManagement;
