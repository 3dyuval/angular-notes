import { AfterViewInit, Component, viewChildren } from '@angular/core';
import { DocsBase, Note } from "../docs-base/docs-base"
import { NoteComponent } from "../note/note.component"
import { NgClass } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";


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
  standalone: true,
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent extends DocsBase<KanbanNote> implements AfterViewInit {

  columnRefs = viewChildren<HTMLDivElement>('column');
  dropping = false;

  ngAfterViewInit() {
    this.columnRefs().forEach((element) => {
      dropTargetForElements({
        element,
        onDrag: () => this.dropping = true,
        onDrop: (payload) => {
          debugger
          console.info('dropped', payload)
          this.dropping = false
        }
      })
    })
  }

  columns = ['todo', 'doing', 'done'] as const
  filters = [
    { key: 'title', value: [], matchMode: 'in' },
    { key: 'status', value: [], matchMode: 'in' }
  ]

  onStatusChanged(status: KanbanNote['status'], index: number) {
    this.setItemProperty('status', status, index)
  }

  getTotalItemsForStatus(status: KanbanNote['status']) {
    return this.items.filter(item => item.status === status).length
  }

  trackByColumn(index: number, column: string): string {
    return column; // Use column name (string) as the unique key
  }

  trackByItem(index: number, item: any): number | string {
    return this.items.findIndex(item);
  }

}
