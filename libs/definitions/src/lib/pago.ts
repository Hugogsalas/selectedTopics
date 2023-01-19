export interface Pago {
  id_pago: number;
  id_tipo_pago: number;
  fecha: number;
}

export interface GetPagosResponse {
  pagos: Pago[];
}

export interface UpdatePagoParams {
  id_pago: number;
  id_tipo_pago?: number;
  fecha?: number;
}

export interface UpdatePagoResponse {
  pago: Pago;
}

export interface AddPagoParams {
  id_tipo_pago: number;
  fecha: number;
}

export interface AddPagoResponse {
  pago: Pago;
}
