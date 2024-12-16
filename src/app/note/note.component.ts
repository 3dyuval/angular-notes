import { Component, input, output } from '@angular/core';
import { KanbanNote } from "../kanban/kanban.component"


@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  standalone: true
})
export class NoteComponent {

  title = input.required<string>();

  onEditItemTitle = output<string>()
  onAddItem = output<void>()
  onRemoveItem = output<void>()

  handleEditItemTitle() {
    const value = prompt('Enter new value', this.title());
    value && this.onEditItemTitle.emit(value)
  }

  handleAddItem() {
    this.onAddItem.emit()
  }

  handleRemoveItem() {
    this.onRemoveItem.emit()
  }



}
