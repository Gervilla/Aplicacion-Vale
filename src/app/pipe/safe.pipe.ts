import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  private sanitizer: DomSanitizer
  constructor() { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
