export interface UsuarioDTO {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  status: string;
  fechaNacimiento: Date;
  sexo: string;
  peso: number;
  altura: number;
  fechaRegistro: Date;
  ultimoAcceso: Date;
  foto?: string;
}
