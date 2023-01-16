export interface tipoPago {
  id_tipo_pago: number;
  descripcion: string;
}

export interface getTipoPagosResponse {
  success: string;
  tiposPago: tipoPago[];
}
