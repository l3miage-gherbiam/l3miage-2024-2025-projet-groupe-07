// Définition de l'interface pour représenter une couleur
export interface Color {
    name: string;
    hex: string;
  }
  
  // Liste de 20 couleurs différentes
const colors: Color[] = [
    { name: 'Rouge',      hex: '#FF0000' }, // Rouge vif
    { name: 'Jaune',      hex: '#FFFF00' }, // Jaune
    { name: 'Vert',       hex: '#008000' }, // Vert
    { name: 'Bleu',       hex: '#0000FF' }, // Bleu
    { name: 'Indigo',     hex: '#4B0082' }, // Indigo
    { name: 'Violet',     hex: '#EE82EE' }, // Violet
    { name: 'Noir',       hex: '#000000' }, // Noir
    { name: 'Marron',     hex: '#A52A2A' }, // Marron
    { name: 'Rose',       hex: '#FFC0CB' }, // Rose
    { name: 'Cyan',       hex: '#00FFFF' }, // Cyan
    { name: 'Magenta',    hex: '#FF00FF' }, // Magenta
    { name: 'Turquoise',  hex: '#40E0D0' }, // Turquoise
    { name: 'Olive',      hex: '#808000' }, // Olive
    { name: 'Corail',     hex: '#FF7F50' }, // Corail
    { name: 'Lavande',    hex: '#E6E6FA' }, // Lavande
    { name: 'Or',         hex: '#FFD700' }, // Or
  ];
  
  // Exemple d'utilisation : affichage de la liste des couleurs dans la console
  colors.forEach(color => {
    console.log(`${color.name} : ${color.hex}`);
  });
  
  export { colors };
  