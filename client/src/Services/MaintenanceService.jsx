

import axios from 'axios';

import { PUBLIC_URL } from '../commons/utils.tsx';

export const getMaintenanceRequests = async () => {
  try {
    const response = await axios.get(PUBLIC_URL+'/api/maintenance');
    return response.data;
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    throw error;
  }
};

export const createMaintenanceRequest = async (data) => {
  try {
    const response = await axios.post(PUBLIC_URL+'/api/maintenance', data);
    return response.data;
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    throw error;
  }
};

export const updateMaintenanceRequest = async (id, data) => {
  try {
    const response = await axios.put(`${PUBLIC_URL}/api/maintenance/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating maintenance request:', error);
    throw error;
  }
};

export const deleteMaintenanceRequest = async (id) => {
  try {
    await axios.delete(`${PUBLIC_URL}/api/maintenance/${id}`);
  } catch (error) {
    console.error('Error deleting maintenance request:', error);
    throw error;
  }
};
