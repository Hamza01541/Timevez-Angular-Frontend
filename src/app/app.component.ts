import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timevez';

  constructor() {
    this.setDefaultThemeColor();
  }

  /**
   * Get theme color from local storage and set it as default theme.
   */
  setDefaultThemeColor() {
    let skin = localStorage.getItem('skin') || 'default';
    let isCompact = JSON.parse(localStorage.getItem('hasCompactMenu'));
    let disabledSkinStylesheet = document.querySelector('link[data-skin]:not([data-skin="' + skin + '"])');

    // Disable unused skin immediately
    disabledSkinStylesheet.setAttribute('rel', '');
    disabledSkinStylesheet.setAttribute('disabled', 'true');
    // add flag class to html immediately
    if (isCompact == true) {
      document.querySelector('html').classList.add('preparing-compact-menu')
    };
  }
}
