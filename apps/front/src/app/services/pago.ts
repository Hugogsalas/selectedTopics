import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddPagoParams,
  AddPagoResponse,
  GetPagosResponse,
  Pago,
  UpdatePagoParams,
  UpdatePagoResponse,
} from '@eagles/definitions';

export const getPagos = async (): Promise<Pago[]> => {
  try {
    const response = await servicesInstance.get<GetPagosResponse>('/pago');
    return response.data.pagos;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];
    return [];
  }
};

export const deletePago = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete('/pago', {
      data: { id_pago: id },
    });
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updatePago = async (data: UpdatePagoParams): Promise<Pago> => {
  try {
    const response = await servicesInstance.put<UpdatePagoResponse>(
      '/pago',
      data
    );
    return response.data.pago;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Pago;
    return {} as Pago;
  }
};

export const addPago = async (data: AddPagoParams): Promise<Pago> => {
  try {
    const response = await servicesInstance.post<AddPagoResponse>(
      '/pago',
      data
    );
    return response.data.pago;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Pago;
    return {} as Pago;
  }
};
