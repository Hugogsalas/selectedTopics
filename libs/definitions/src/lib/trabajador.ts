export interface Trabajador {
  id_trabajador: number;
  id_usuario: number;
  salario: number;
}

export interface getTrabajadorResponse {
  success: boolean;
  trabajador: Trabajador;
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
  id_usuario?: number;
  salario?: number;
}

export interface UpdateTrabajadorResponse {
  success: boolean;
  trabajador: Trabajador;
}

export interface AddTrabajadorParams {
  id_usuario: number;
  salario: number;
}

export interface AddTrabajadorResponse {
  success: boolean;
  trabajador: Trabajador;
}
