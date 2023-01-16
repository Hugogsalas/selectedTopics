export interface rol {
  id_rol: number;
  descripcion: string;
}

export interface getRolesResponse {
  success: boolean;
  roles: rol[];
}

export interface deleteRolResponse {
  success: boolean;
  messaege: string;
}

export interface updateRolResponse {
  success: boolean;
  messaege: string;
}

export interface addRolResponse {
  success: boolean;
  messaege: string;
}
