import { defineStore } from 'pinia'

export const useGridStore = defineStore({
  id: 'GridStore',
  state: () => ({
    settings: {
      colNum: 12,
      rowHeight: 64,
      verticalCompact: true,
      preventCollision: false,
    },
    items: [] as Array<Item>
  }),
  getters: {
    getAllItems(): Array<Item> {
      return this.items
    }
  },
  actions: {
    addItem(item: Item) {
      if (item) {

        if (!item.layout.x) {
          item.layout.x = 1
        }

        if (!item.layout.y) {
          item.layout.y = 1
        }

        if (!item.layout.i) {
          item.layout.i = Math.random().toString(36).slice(2)
        }
        
        console.log(item)
        this.items = []
        this.items.push(item)
      } else {
        throw new Error('Item not pushed because it is null or empty')
      }
    },
    removeItem(item: Item) {
      const index = this.items.map(e => e.layout.i).indexOf(item.layout.i)
      this.items.splice(index,1)
    }
  }
})

export interface Item {
  label: string
  layout: {
    x?: number
    y?: number
    h?: number
    w?: number
    i?: any
  }
  image?: Image
}

export interface Image {
  values: object
  url: string
}
