export interface Cargo {
  id_cargo: number;
  id_reservacion: number;
  descripcion: string;
  monto: number;
  fecha: number;
  id_pago: number | null;
}

export interface GetCargosResponse {
  cargos: Cargo[];
}

export interface UpdateCargoParams {
  id_cargo: number;
  id_reservacion?: number;
  descripcion?: string;
  monto?: number;
  fecha?: Date;
  id_pago?: number | null;
}

export interface UpdateCargoResponse {
  cargo: Cargo;
}

export interface AddCargoParams {
  id_reservacion: number;
  descripcion: string;
  monto: number;
  fecha: Date;
  id_pago?: number | null;
}

export interface AddCargoResponse {
  cargo: Cargo;
}
