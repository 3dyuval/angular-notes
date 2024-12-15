import { Component, signal } from '@angular/core';
import { NotesComponent } from "../notes/notes.component"

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-notes/>
  `,
  imports: [
    NotesComponent
  ]
})
export default class YoComponent {
}
