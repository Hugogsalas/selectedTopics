export interface tipoHabitacion {
  id_tipo_habitacion: number;
  capacidad: number;
  descripcion: string;
  precio: number;
}

export interface getTipoHabitacionesResponse {
  success: boolean;
  tiposHabitacion: tipoHabitacion[];
}
