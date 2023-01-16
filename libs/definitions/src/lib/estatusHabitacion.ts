export interface estatusHabitacion {
  id_status: number;
  descripcion: string;
}

export interface getEstatusHabitacionResponse {
  success: string;
  estatus_habitacion: estatusHabitacion[];
}
