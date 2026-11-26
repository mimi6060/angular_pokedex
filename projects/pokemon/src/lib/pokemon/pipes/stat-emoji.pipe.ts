import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statEmoji',
  standalone: true, // très important pour Angular 15+
})
export class StatEmojiPipe implements PipeTransform {
  transform(statName: string): string {
    switch (statName?.toLowerCase()) {
      case 'hp': return '❤️';
      case 'attack': return '⚔️';
      case 'defense': return '🛡️';
      case 'speed': return '💨';
      case 'special-attack': return '🔮';
      case 'special-defense': return '🧱';
      default: return '📊';
    }
  }
}
