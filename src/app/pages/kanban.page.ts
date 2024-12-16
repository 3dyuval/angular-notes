import { Component, signal } from '@angular/core';
import { NotesComponent } from "../notes/notes.component"
import { Repo } from "@automerge/automerge-repo"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel"
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket'
import { KanbanComponent } from "../kanban/kanban.component"
import { RouteConfig } from "@analogjs/router/lib/models"


export const routeConfig: RouteConfig = {
  title: 'Kanban',
}

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-kanban />
  `,
  imports: [
    NotesComponent,
    KanbanComponent
  ]
})
export default class YoComponent {


}
