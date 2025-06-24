import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanContent',
  standalone: true
})
export class CleanContentPipe implements PipeTransform {
  transform(value: string, limit: number = 250): string {
    if (!value) return '';

    // Elimina tutto ciò che segue il tag "[+xxxx chars]"
    const cutoffIndex = value.indexOf('[+');
    let cleaned = cutoffIndex !== -1 ? value.slice(0, cutoffIndex).trim() : value;

    // Se la lunghezza è già sotto il limite, restituisci il testo pulito
    if (cleaned.length <= limit) {
      return cleaned;
    }

    // Troncamento soft per non spezzare parole
    let truncated = cleaned.slice(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    truncated = truncated.slice(0, lastSpace);

    return truncated + '...';
  }
}
