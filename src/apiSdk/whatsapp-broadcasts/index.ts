import axios from 'axios';
import queryString from 'query-string';
import { WhatsappBroadcastInterface, WhatsappBroadcastGetQueryInterface } from 'interfaces/whatsapp-broadcast';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWhatsappBroadcasts = async (
  query?: WhatsappBroadcastGetQueryInterface,
): Promise<PaginatedInterface<WhatsappBroadcastInterface>> => {
  const response = await axios.get('/api/whatsapp-broadcasts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWhatsappBroadcast = async (whatsappBroadcast: WhatsappBroadcastInterface) => {
  const response = await axios.post('/api/whatsapp-broadcasts', whatsappBroadcast);
  return response.data;
};

export const updateWhatsappBroadcastById = async (id: string, whatsappBroadcast: WhatsappBroadcastInterface) => {
  const response = await axios.put(`/api/whatsapp-broadcasts/${id}`, whatsappBroadcast);
  return response.data;
};

export const getWhatsappBroadcastById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/whatsapp-broadcasts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWhatsappBroadcastById = async (id: string) => {
  const response = await axios.delete(`/api/whatsapp-broadcasts/${id}`);
  return response.data;
};
