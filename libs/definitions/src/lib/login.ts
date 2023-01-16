export interface loginRequest {
  email: string;
  clave: string;
}

export interface loginResponse {
  success: boolean;
  message: string;
  token: string;
  usuario: {
    id: number;
    nombre_usuario: string;
    email: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_rol: number;
  };
}
