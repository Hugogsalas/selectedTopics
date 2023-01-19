import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddHabitacionParams,
  AddHabitacionResponse,
  getHabitacionesResponse,
  Habitacion,
  UpdateHabitacionParams,
  UpdateHabitacionResponse,
} from '@eagles/definitions';

export const getHabitaciones = async (): Promise<Habitacion[]> => {
  try {
    const response = await servicesInstance.get<getHabitacionesResponse>(
      '/habitacion'
    );

    return response.data.habitaciones;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};

export const deleteHabitacion = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete('/habitacion', {
      data: { id_habitacion: id },
    });
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updateHabitacion = async (
  data: UpdateHabitacionParams
): Promise<Habitacion> => {
  try {
    const response = await servicesInstance.put<UpdateHabitacionResponse>(
      '/habitacion',
      data
    );
    return response.data.habitacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Habitacion;
    return {} as Habitacion;
  }
};

export const addHabitacion = async (
  data: AddHabitacionParams
): Promise<Habitacion> => {
  try {
    const response = await servicesInstance.post<AddHabitacionResponse>(
      '/habitacion',
      data
    );
    return response.data.habitacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Habitacion;
    return {} as Habitacion;
  }
};
