import { Component, signal } from '@angular/core';
import { NotesComponent } from "../notes/notes.component"
import { Repo } from "@automerge/automerge-repo"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel"
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket'

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-notes />
  `,
  imports: [
    NotesComponent
  ]
})
export default class NotesPageComponent {

}
