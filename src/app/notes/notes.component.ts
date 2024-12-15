import { Component } from '@angular/core';
import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
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
export class NotesComponent {

  repo: Repo
  router = injectRouter()
  handle: DocHandle<Notes>

  public notes: Notes = [{ title: 'Note 1', done: false }]

  constructor() {

    this.repo = new Repo({
      storage: new IndexedDBStorageAdapter()
      // network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
    })

    if (isValidAutomergeUrl(this.rootDocUrl)) {
      this.handle = this.repo.find(this.rootDocUrl)
      console.log('loaded doc', this.handle)
    } else {
      this.handle = this.repo.create({ notes: [{ title: 'Note 1', done: false }] })
      console.log('created doc', this.handle)
      this.rootDocUrl = this.handle.url
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


  editNote(index: number) {
    const newValue = prompt('Enter new value');
    if (newValue) {
      this.handle.change((doc: { notes: Notes }) => {
        doc.notes[index].title = newValue!;
      })
    }
  }

  toggleComplete(value: boolean, index: number) {
    this.notes[index].done = value;
  }

}

