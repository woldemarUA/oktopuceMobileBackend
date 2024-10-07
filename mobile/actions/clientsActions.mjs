import { Clients } from '../../adminjs-app/db/entities/Clients/Clients.mjs';
import { ClientTypes } from '../../adminjs-app/db/entities/Clients/ClientsTypes.mjs';

export const fetchClients = async () => {
  try {
    const response = await Clients.findAll();

    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
