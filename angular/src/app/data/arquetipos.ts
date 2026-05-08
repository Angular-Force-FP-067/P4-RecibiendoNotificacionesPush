import { Arquetipo } from '../models/arquetipos';

export const ARQUETIPOS: Arquetipo[] = [
/* ENTRENADORES */
{
  nombre: "Juan",
  apellidos: "Pérez",
  edad: 45,
  rol: "entrenador",
  lateMotiv: "Mejorar el rendimiento del equipo",
  biografia: "Entrenador con 15 años de experiencia en equipos de cantera.",
  objetivos: [
    "Controlar el rendimiento del equipo",
    "Analizar estadísticas de jugadores"
  ],
  frustraciones: [
    "Falta de datos organizados",
    "Dificultad para seguir la evolución de jugadores"
  ],
  comportamiento: [
    "Revisa estadísticas después de cada partido",
    "Planifica entrenamientos semanalmente"
  ],
  usoTecnologia: [
    "Apps deportivas",
    "Herramientas de análisis de datos"
  ]
},

{
  nombre: "Marta",
  apellidos: "Gómez",
  edad: 38,
  rol: "entrenador",
  lateMotiv: "Desarrollar talento joven",
  biografia: "Entrenadora de baloncesto base especializada en desarrollo juvenil.",
  objetivos: [
    "Mejorar habilidades técnicas",
    "Motivar a los jugadores"
  ],
  frustraciones: [
    "Falta de seguimiento de progreso",
    "Herramientas poco intuitivas"
  ],
  comportamiento: [
    "Analiza rendimiento semanal",
    "Comunicación constante con jugadores"
  ],
  usoTecnologia: [
    "Apps móviles",
    "Videos de análisis"
  ]
},

/* JUGADORES */
{
  nombre: "Carlos",
  apellidos: "López",
  edad: 19,
  rol: "jugador",
  lateMotiv: "Mejorar mis estadísticas",
  biografia: "Jugador amateur que busca progresar y llegar a ligas superiores.",
  objetivos: [
    "Mejorar tiro",
    "Aumentar minutos de juego"
  ],
  frustraciones: [
    "No saber en qué mejorar",
    "Falta de feedback"
  ],
  comportamiento: [
    "Entrena diariamente",
    "Consulta estadísticas personales"
  ],
  usoTecnologia: [
    "Apps deportivas",
    "Redes sociales"
  ]
},
{
  nombre: "David",
  apellidos: "Martín",
  edad: 21,
  rol: "jugador",
  lateMotiv: "Llegar a nivel profesional",
  biografia: "Jugador joven con gran ambición deportiva.",
  objetivos: [
    "Mejorar condición física",
    "Destacar en competiciones"
  ],
  frustraciones: [
    "Poca visibilidad de rendimiento",
    "Dificultad para medir progreso"
  ],
  comportamiento: [
    "Entrena extra horas",
    "Analiza partidos grabados"
  ],
  usoTecnologia: [
    "Apps de entrenamiento",
    "Videos deportivos"
  ]
},

/* AFICIONADOS */
{
  nombre: "Laura",
  apellidos: "García",
  edad: 28,
  rol: "aficionado",
  lateMotiv: "Seguir a mi equipo favorito",
  biografia: "Aficionada que disfruta viendo partidos y analizando estadísticas.",
  objetivos: [
    "Seguir resultados",
    "Ver estadísticas de jugadores"
  ],
  frustraciones: [
    "Falta de información clara",
    "Apps deportivas poco intuitivas"
  ],
  comportamiento: [
    "Ve partidos en directo",
    "Consulta resultados constantemente"
  ],
  usoTecnologia: [
    "Apps deportivas",
    "Redes sociales"
  ]
},
{
  nombre: "Pedro",
  apellidos: "Ruiz",
  edad: 34,
  rol: "aficionado",
  lateMotiv: "Analizar estadísticas de partidos",
  biografia: "Aficionado al análisis de datos deportivos.",
  objetivos: [
    "Comparar jugadores",
    "Analizar rendimiento"
  ],
  frustraciones: [
    "Datos dispersos",
    "Falta de visualización clara"
  ],
  comportamiento: [
    "Consulta estadísticas frecuentemente",
    "Debate en foros deportivos"
  ],
  usoTecnologia: [
    "Apps deportivas",
    "Webs de estadísticas"
  ]
}
];