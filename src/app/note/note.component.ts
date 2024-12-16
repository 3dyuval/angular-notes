import { Component, ElementRef, inject, input, output } from '@angular/core';
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"


@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  standalone: true,
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  title = input.required<string>();

  onEditItemTitle = output<string>()
  onAddItem = output<void>()
  onRemoveItem = output<void>()

  dragging = false;
  private elementRef = inject(ElementRef)

  ngAfterViewInit() {
    draggable({
      element: this.elementRef.nativeElement,
      onDrag: () => this.dragging = true,
      onDrop: () => this.dragging = false
    })
  }

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
