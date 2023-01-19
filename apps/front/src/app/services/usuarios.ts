import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  AddUsuarioParams,
  AddUsuarioResponse,
  getUsuariosResponse,
  UpdateUsuarioParams,
  UpdateUsuarioResponse,
  Usuario,
} from '@eagles/definitions';

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
  id: number,
  data: UpdateUsuarioParams
): Promise<Usuario> => {
  try {
    const response = await servicesInstance.put<UpdateUsuarioResponse>(
      `/usuario/${id}`,
      data
    );
    return response.data.usuario;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Usuario;
    return {} as Usuario;
  }
};

export const addUsuario = async (data: AddUsuarioParams): Promise<Usuario> => {
  try {
    const response = await servicesInstance.post<AddUsuarioResponse>(
      '/usuario',
      data
    );
    return response.data.usuario;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return {} as Usuario;
    return {} as Usuario;
  }
};
