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
  success: true;
  trabajadores: Trabajador[];
}

export interface DeleteTrabajadorParams {
  id: number;
}

export interface UpdateTrabajadorParams {
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
  success: true;
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
  success: true;
  trabajador: Trabajador;
}
