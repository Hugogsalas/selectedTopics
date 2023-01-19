import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddCargoParams,
  AddCargoResponse,
  GetCargosResponse,
  Cargo,
  UpdateCargoParams,
  UpdateCargoResponse,
} from '@eagles/definitions';

export const getCargos = async (): Promise<Cargo[]> => {
  try {
    const response = await servicesInstance.get<GetCargosResponse>('/cargo');
    return response.data.cargos;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];
    return [];
  }
};

export const deleteCargo = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete('/cargo', {
      data: { id_cargo: id },
    });
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updateCargo = async (data: UpdateCargoParams): Promise<Cargo> => {
  try {
    const response = await servicesInstance.put<UpdateCargoResponse>(
      '/cargo',
      data
    );
    return response.data.cargo;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Cargo;
    return {} as Cargo;
  }
};

export const addCargo = async (data: AddCargoParams): Promise<Cargo> => {
  try {
    const response = await servicesInstance.post<AddCargoResponse>(
      '/cargo',
      data
    );
    return response.data.cargo;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Cargo;
    return {} as Cargo;
  }
};
