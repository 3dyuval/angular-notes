import { Component, input, output } from '@angular/core';


@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  standalone: true
})
export class NoteComponent {

  title = input.required<string>();
  done = input.required<boolean>();

  onEditItemTitle = output<string>()
  onAddItem = output<void>()
  onRemoveItem = output<void>()
  onSetComplete = output<boolean>()

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

  handleSetComplete(value: boolean) {
    this.onSetComplete.emit(value)
  }

}
