import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'ercaHighlight'
})
export class ErcaHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    text: string,
    highlightedText: string,
    styleClass: string
  ): SafeHtml | null {
    if (text && highlightedText) {
      let pattern = highlightedText.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        '\\$&'
      );

      pattern = pattern
        .split(' ')
        .filter(t => t.length > 0)
        .join('|');

      const regex = new RegExp(pattern, 'gi');

      return this.sanitizer.bypassSecurityTrustHtml(
        text.replace(
          regex,
          match => `<span class="${styleClass}">${match}</span>`
        )
      );
    } else {
      return text;
    }
  }
}
