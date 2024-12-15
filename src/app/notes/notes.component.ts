import { Component, Input, OnInit } from '@angular/core';
import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { FormsModule } from "@angular/forms"
import { injectRouter } from "@analogjs/router"


type Note = { title: string, done: boolean }
type Notes = Array<Note>

@Component({
  selector: 'app-notes',
  imports: [
    FormsModule
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  standalone: true
})
export class NotesComponent implements OnInit {

  @Input() repo!: Repo
  router = injectRouter()
  handle!: DocHandle<Notes>

  initialized = false;

  public notes: Notes = []

  ngOnInit() {

    if (isValidAutomergeUrl(this.rootDocUrl)) {
      this.handle = this.repo.find(this.rootDocUrl)
      this.handle.doc().then(doc => this.notes = doc.notes)
        .finally(() => this.initialized = true)
      console.log('loaded doc.notes', this.notes)
    } else {
      this.handle = this.repo.create({ notes: [{ title: 'Note 1', done: false }] })
      console.log('created handle', this.handle)
      this.rootDocUrl = this.handle.url
      this.initialized = true
    }

    this.handle.on('change', ({ doc }) => {
      this.notes = doc.notes
    })
  }

  get rootDocUrl() {
    return this.router.url.split('#')[1] || '';
  }

  set rootDocUrl(url: string) {
    document.location.hash = url
  }


  addNote(index?: number) {
    this.handle.change((doc: { notes: Notes }) => {
      index = index || doc.notes.length
      doc.notes.splice(index, 0, { title: '', done: false })
    })
  }

  editNote(index: number) {
    const value = prompt('Enter new value', this.notes[index].title);
    if (value) {
      this.handle.change((doc: { notes: Notes }) => {
        doc.notes[index].title = value!;
      })
    }
  }

  toggleComplete(value: boolean, index: number) {
    this.handle.change((doc: { notes: Notes }) => {
      doc.notes[index].done = value;
    })
  }

  removeNote(index: number) {
    this.handle.change((doc: { notes: Notes }) => {
      doc.notes.splice(index, 1)
    })
  }

}

