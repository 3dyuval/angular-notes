import { Component } from '@angular/core';
import { DocsBase, Note } from "../docs-base/docs-base"
import { NoteComponent } from "../note/note.component"
import { NgClass } from "@angular/common"
import { FormsModule } from "@angular/forms"


export interface KanbanNote extends Note {
  status: 'todo' | 'doing' | 'done'
}

@Component({
  selector: 'app-kanban',
  imports: [
    NoteComponent,
    NgClass,
    FormsModule
  ],
  templateUrl: './kanban.component.html',
  standalone: true
})
export class KanbanComponent extends DocsBase<KanbanNote> {

  columns = ['todo', 'doing', 'done'] as const
  filters = [
    { key: 'title', value: [], matchMode: 'in' },
    { key: 'status', value: [], matchMode: 'in' }
  ]

  onStatusChanged(status: KanbanNote['status'], index: number) {
    this.setItemProperty('status', status, index)
  }


}
