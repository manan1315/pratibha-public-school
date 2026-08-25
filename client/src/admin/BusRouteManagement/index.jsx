import React from 'react';
import ResourceManager from '../components/ResourceManager';
import { busRouteAPI } from '../../services/api';

const fields = [
  { name: 'routeNumber', label: 'Route Number', type: 'text', required: true, placeholder: 'R-1' },
  { name: 'routeName', label: 'Route Name', type: 'text', required: true, placeholder: 'Basna Town Route' },
  { name: 'stops', label: 'Stops', type: 'list', rows: 5, placeholder: 'One stop per line' },
  { name: 'timing', label: 'Timing', type: 'text', placeholder: 'Pickup 6:50 AM / Drop 3:30 PM' },
  { name: 'isActive', label: 'Active', type: 'boolean', default: true },
];

const columns = [
  { key: 'routeNumber', label: 'Route' },
  { key: 'routeName', label: 'Name' },
  { key: 'stops', label: 'Stops', render: (i) => (i.stops || []).join(', ').slice(0, 60) },
  { key: 'timing', label: 'Timing' },
];

const BusRouteManagement = () => (
  <ResourceManager title="Bus Routes" api={busRouteAPI} fields={fields} columns={columns} />
);

export default BusRouteManagement;
