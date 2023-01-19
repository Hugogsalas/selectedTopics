export interface Habitacion {
  id_habitacion: number;
  numero: number;
  id_tipo_habitacion: number;
  id_status: number;
}

export interface getHabitacionesResponse {
  success: boolean;
  habitaciones: Habitacion[];
}

export interface DeleteHabitacionParams {
  id: number;
}

export interface UpdateHabitacionParams {
  id_habitacion?: number;
  numero?: number;
  id_tipo_habitacion?: number;
  id_status?: number;
}

export interface UpdateHabitacionResponse {
  success: boolean;
  habitacion: Habitacion;
}

export interface AddHabitacionParams {
  numero: number;
  id_tipo_habitacion: number;
  id_status: number;
}

export interface AddHabitacionResponse {
  success: boolean;
  habitacion: Habitacion;
}
