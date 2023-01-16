import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  getTipoHabitacionesResponse,
  tipoHabitacion,
} from '@eagles/definitions';

export const getTiposHabitaciones = async (): Promise<tipoHabitacion[]> => {
  try {
    const response = await servicesInstance.get<getTipoHabitacionesResponse>(
      '/tipoHabitacion'
    );

    return response.data.tiposHabitacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};
