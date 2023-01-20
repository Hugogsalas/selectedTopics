export interface Reservacion {
  id_reservacion: number;
  id_cliente: number;
  id_habitacion: number;
  id_trabajador: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface GetReservacionResponse {
  success: boolean;
  reservacion: Reservacion;
}
export interface GetReservacionesResponse {
  success: boolean;
  reservaciones: Reservacion[];
}

export interface DeleteReservacionParams {
  id: number;
}

export interface UpdateReservacionParams {
  id_reservacion: number;
  id_cliente?: number;
  id_habitacion?: number;
  id_trabajador?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export interface UpdateReservacionResponse {
  success: boolean;
  reservacion: Reservacion;
}

export interface AddReservacionParams {
  id_cliente: number;
  id_habitacion: number;
  id_trabajador: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface AddReservacionResponse {
  success: boolean;
  reservacion: Reservacion;
}
