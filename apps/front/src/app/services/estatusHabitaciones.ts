import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  getEstatusHabitacionResponse,
  estatusHabitacion,
} from '@eagles/definitions';

export const getEstatusHabitaciones = async (): Promise<
  estatusHabitacion[]
> => {
  try {
    const response = await servicesInstance.get<getEstatusHabitacionResponse>(
      '/estatusHabitacion'
    );

    return response.data.estatus_habitacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};
