import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddUsuarioParams,
  AddUsuarioResponse,
  getUsuarioResponse,
  getUsuariosResponse,
  UpdateUsuarioParams,
  UpdateUsuarioResponse,
  Usuario,
} from '@eagles/definitions';

export const getUsuario = async (id: string): Promise<Usuario | undefined> => {
  try {
    const response = await servicesInstance.get<getUsuarioResponse>(
      `/usuario?id_usuario=${id}`
    );

    return response.data.usuario;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return undefined;

    return undefined;
  }
};
export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await servicesInstance.get<getUsuariosResponse>(
      '/usuario'
    );

    return response.data.usuarios;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};

export const deleteUsuario = async (id: number): Promise<boolean> => {
  try {
    await servicesInstance.delete(`/usuario/${id}`);
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const updateUsuario = async (
  data: UpdateUsuarioParams
): Promise<boolean> => {
  try {
    await servicesInstance.put<UpdateUsuarioResponse>(
      `/usuario?id_usuario=${data.id_usuario}`,
      data
    );
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};

export const addUsuario = async (data: AddUsuarioParams): Promise<boolean> => {
  try {
    await servicesInstance.post<AddUsuarioResponse>('/usuario', data);
    return true;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;
    return false;
  }
};
