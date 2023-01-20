import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  Trabajador,
  getTrabajadoresResponse,
  UpdateTrabajadorParams,
  UpdateTrabajadorResponse,
  AddTrabajadorParams,
  AddTrabajadorResponse,
  getTrabajadorResponse,
} from '@eagles/definitions';

export const getTrabajador = async (
  id: string
): Promise<Trabajador | undefined> => {
  try {
    const response = await servicesInstance.get<getTrabajadorResponse>(
      `/trabajador?id_trabajador=${id}`
    );

    return response.data.trabajador;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return undefined;

    return undefined;
  }
};

export const getTrabajadores = async (): Promise<Trabajador[]> => {
  try {
    const response = await servicesInstance.get<getTrabajadoresResponse>(
      '/trabajador'
    );

    return response.data.trabajadores;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};

export const deleteTrabajador = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete('/trabajador', {
      data: { id_trabajador: id },
    });
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updateTrabajador = async (
  data: UpdateTrabajadorParams
): Promise<Trabajador> => {
  try {
    const response = await servicesInstance.put<UpdateTrabajadorResponse>(
      '/trabajador',
      data
    );
    return response.data.trabajador;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Trabajador;
    return {} as Trabajador;
  }
};

export const addTrabajador = async (
  data: AddTrabajadorParams
): Promise<boolean> => {
  try {
    const response = await servicesInstance.post<AddTrabajadorResponse>(
      '/trabajador',
      data
    );
    return response.status === 200;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};
