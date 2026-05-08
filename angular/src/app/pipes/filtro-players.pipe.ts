import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/players';

@Pipe({
  name: 'filtroPlayers',
  standalone: true
})
export class FiltroPlayersPipe implements PipeTransform {

  // El método transform recibe el array de jugadores y los criterios de filtrado
    transform( 
    players: Player[],
    nombre: string,
    posicion: string,
    edadMin?: number
  ): Player[] {

    if (!players) return [];
    return players.filter(player => {
// Verificación de si el nombre coincide
      const coincideNombre = nombre
        ? (player.nombre + ' ' + player.apellidos)
            .toLowerCase()
            .includes(nombre.toLowerCase())
        : true;
// Verificación de si la posición coincide
      const coincidePosicion = posicion
        ? player.posicion === posicion
        : true;
// Verificación de si la edad mínima coincide
      const coincideEdad = edadMin
        ? player.edad >= edadMin
        : true;

      return coincideNombre && coincidePosicion && coincideEdad;

    });

  }
}