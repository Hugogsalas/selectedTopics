import { AxiosError } from 'axios';
import { servicesInstance } from '../utils/axios';
import {
  addRolResponse,
  deleteRolResponse,
  getRolesResponse,
  rol,
  updateRolResponse,
} from '@eagles/definitions';

export const getRoles = async (): Promise<rol[]> => {
  try {
    const response = await servicesInstance.get<getRolesResponse>('/roles');

    return response.data.roles;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return [];

    return [];
  }
};

export const deleteRole = async (id: number): Promise<boolean> => {
  try {
    const response = await servicesInstance.delete<deleteRolResponse>(
      '/roles',
      {
        data: { id_rol: id },
      }
    );

    return response.data.success;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;

    return false;
  }
};

export const updateRol = async (changedRol: rol): Promise<boolean> => {
  try {
    const response = await servicesInstance.put<updateRolResponse>(
      '/roles',
      changedRol
    );

    return response.data.success;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;

    return false;
  }
};

export const addRole = async (newRole: {
  descripcion: string;
}): Promise<boolean> => {
  try {
    const response = await servicesInstance.post<addRolResponse>(
      '/roles',
      newRole
    );

    return response.data.success;
  } catch (error: unknown) {
    console.error(error);
    if (!(error as AxiosError).isAxiosError) return false;

    return false;
  }
};
