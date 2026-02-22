export type User = {
  id: string;
  nombre: string;
  email: string;
  meta_semanal: number;
  fecha_registro: number;
};

export type DrinkType = 'cerveza' | 'vino' | 'coctel' | 'destilado' | 'agua' | 'mocktail';

export type Consumo = {
  id: string;
  tipo: DrinkType;
  unidades: number;
  timestamp: number;
  fecha_formateada: string; // YYYY-MM-DD
};

export type Promocion = {
  id: string;
  titulo: string;
  descripcion: string;
  tipo_bebida: DrinkType | 'todas';
  activa: boolean;
  imagen: string;
  codigo: string;
  marca: string;
};
