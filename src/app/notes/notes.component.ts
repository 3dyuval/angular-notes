import { Component, Input, OnInit } from '@angular/core';
import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { FormsModule } from "@angular/forms"
import { injectRouter } from "@analogjs/router"
import { DocsBase } from "../docs-base/docs-base"
import { NoteComponent } from "../note/note.component"


@Component({
  selector: 'app-notes',
  imports: [
    FormsModule,
    NoteComponent
  ],
  templateUrl: './notes.component.html',
  standalone: true
})
export class NotesComponent extends DocsBase {
}

