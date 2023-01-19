export interface Reservacion {
  id_reservacion: number;
  id_cliente: number;
  id_habitacion: number;
  fecha_inicio: number;
  fecha_fin: number;
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
  fechaInicio?: number;
  fechaFin?: number;
}

export interface UpdateReservacionResponse {
  success: boolean;
  reservacion: Reservacion;
}

export interface AddReservacionParams {
  id_cliente: number;
  id_habitacion: number;
  fecha_inicio: number;
  fecha_fin: number;
}

export interface AddReservacionResponse {
  success: boolean;
  reservacion: Reservacion;
}
