import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddReservacionParams,
  AddReservacionResponse,
  GetReservacionesResponse,
  Reservacion,
  UpdateReservacionParams,
  UpdateReservacionResponse,
} from '@eagles/definitions';

export const getReservaciones = async (): Promise<Reservacion[]> => {
  try {
    const response = await servicesInstance.get<GetReservacionesResponse>(
      '/reservacion'
    );
    return response.data.reservaciones;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];
    return [];
  }
};

export const deleteReservacion = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete('/reservacion', {
      data: { id_reservacion: id },
    });
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updateReservacion = async (
  data: UpdateReservacionParams
): Promise<Reservacion> => {
  try {
    const response = await servicesInstance.put<UpdateReservacionResponse>(
      '/reservacion',
      data
    );
    return response.data.reservacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Reservacion;
    return {} as Reservacion;
  }
};

export const addReservacion = async (
  data: AddReservacionParams
): Promise<Reservacion> => {
  try {
    const response = await servicesInstance.post<AddReservacionResponse>(
      '/reservacion',
      data
    );
    return response.data.reservacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Reservacion;
    return {} as Reservacion;
  }
};
