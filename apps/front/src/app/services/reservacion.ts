import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddReservacionParams,
  AddReservacionResponse,
  GetReservacionResponse,
  GetReservacionesResponse,
  Reservacion,
  UpdateReservacionParams,
  UpdateReservacionResponse,
} from '@eagles/definitions';

export const getReservacion = async (
  id: string
): Promise<Reservacion | undefined> => {
  try {
    const response = await servicesInstance.get<GetReservacionResponse>(
      `/reservacion?id_reservacion=${id}`
    );
    return response.data.reservacion;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return undefined;
    return undefined;
  }
};

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
): Promise<boolean> => {
  try {
    const response = await servicesInstance.post<AddReservacionResponse>(
      '/reservacion',
      data
    );
    return response.status === 200;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};
