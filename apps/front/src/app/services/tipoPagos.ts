import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import { getTipoPagosResponse, tipoPago } from '@eagles/definitions';

export const getTiposPagos = async (): Promise<tipoPago[]> => {
  try {
    const response = await servicesInstance.get<getTipoPagosResponse>(
      '/tipoPago'
    );

    return response.data.tiposPago;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};
