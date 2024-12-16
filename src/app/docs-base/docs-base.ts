import { Directive, Input, OnInit } from '@angular/core';
import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { injectRouter } from "@analogjs/router"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel"


export type Note = { title: string }

@Directive({
  standalone: true
})
export abstract class DocsBase<T extends Note = any> implements OnInit {

  get rootDocUrl() {
    return this._rootDocUrl || this.router.url.split('#')[1] || '';
  }

  set rootDocUrl(url: string) {
    document.location.hash = url
  }

  @Input({ alias: 'rootDocUrl' }) _rootDocUrl?: string
  @Input() repo!: Repo
  public items: Array<T> = []
  router = injectRouter()
  handle!: DocHandle<T>
  initialized = false;

  ngOnInit() {
    this.repo = new Repo({
      storage: new IndexedDBStorageAdapter(),
      network: [
        // @ts-ignore
        new BroadcastChannelNetworkAdapter()
      ]
    })

    if (isValidAutomergeUrl(this.rootDocUrl)) {
      this.handle = this.repo.find(this.rootDocUrl)
      this.handle.doc().then(doc => this.items = doc.items)
        .finally(() => this.initialized = true)
      console.log('loaded doc.items', this.items)
    } else {
      this.handle = this.repo.create({ items: [{title: '' }] })
      console.log('created handle', this.handle)
      this.rootDocUrl = this.handle.url
      this.initialized = true
    }

    this.handle.on('change', ({ doc }) => {
      this.items = doc.items
    })
  }


  addItem(index?: number, initialItem?: Partial<T>) {
    this.handle.change((doc: { items: Array<T> }) => {
      index = index || doc.items.length
      doc.items.splice(index, 0, { title: '', ...initialItem } as T)
    })
  }

  editItemTitle(value: string, index: number) {
    if (value) {
      this.handle.change((doc: { items: Array<T> }) => {
        doc.items[index].title = value!;
      })
    }
  }

  setItemProperty(property: keyof T, value: any, index: number) {
    this.handle.change((doc: { items: Array<T> }) => {
      doc.items[index][property] = value;
    })
  }

  removeItem(index: number) {
    this.handle.change((doc: { items: Array<T> }) => {
      doc.items.splice(index, 1)
    })
  }

}

