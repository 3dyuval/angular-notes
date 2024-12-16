import { Component } from '@angular/core';
import { NotesComponent } from "../notes/notes.component"
import { KanbanComponent } from "../kanban/kanban.component"
import { RouteConfig } from "@analogjs/router/lib/models"


export const routeConfig: RouteConfig = {
  title: 'Kanban'
}

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-kanban/>
  `,
  imports: [
    NotesComponent,
    KanbanComponent
  ]
})
export default class KanbanPageComponent {


}
