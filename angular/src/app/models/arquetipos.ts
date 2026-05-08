export interface Arquetipo {
  nombre: string;
  apellidos: string;
  edad: number;
  rol: 'entrenador' | 'jugador' | 'aficionado';

  lateMotiv: string;
  biografia: string;

  objetivos: string[];
  frustraciones: string[];
  comportamiento: string[];
  usoTecnologia: string[];
}