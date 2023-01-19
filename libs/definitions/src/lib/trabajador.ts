export interface Trabajador {
  id_trabajador: number;
  salario: number;
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

export interface getTrabajadoresResponse {
  success: boolean;
  trabajadores: Trabajador[];
}

export interface DeleteTrabajadorParams {
  id: number;
}

export interface UpdateTrabajadorParams {
  id_trabajador: number;
  salario?: number;
  id_usuario?: number;
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

export interface UpdateTrabajadorResponse {
  success: boolean;
  trabajador: Trabajador;
}

export interface AddTrabajadorParams {
  salario: number;
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

export interface AddTrabajadorResponse {
  success: boolean;
  trabajador: Trabajador;
}
