export interface Usuario {
  id_usuario: number;
  nombre_usuario: string;
  email: string;
  clave: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
  telefono: string;
  direccion: string;
  rfc: string;
  id_rol: number;
}

export interface getUsuariosResponse {
  success: true;
  usuarios: Usuario[];
}
export interface getUsuarioResponse {
  success: true;
  usuario: Usuario;
}

export interface AddUsuarioParams {
  nombre_usuario: string;
  email: string;
  clave: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
  telefono: string;
  direccion: string;
  rfc: string;
  id_rol: number;
}

export interface AddUsuarioResponse {
  success: true;
  usuario: Usuario;
}
export interface UpdateUsuarioParams {
  id_usuario: number;
  nombre_usuario?: string;
  email?: string;
  clave?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  nombre?: string;
  telefono?: string;
  direccion?: string;
  rfc?: string;
  id_rol?: number;
}

export interface UpdateUsuarioResponse {
  success: true;
  usuario: Usuario;
}

export interface DeleteUsuarioParams {
  id: number;
}
