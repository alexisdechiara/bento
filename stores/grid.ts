import { defineStore } from 'pinia'

export const useGridStore = defineStore({
  id: 'GridStore',
  state: () => ({
    settings: {
      colNum: 12 as number,
      rowHeight: 100 as number,
      verticalCompact: true as boolean,
      freeGrid: true as boolean,
      preventCollision: false as boolean,
      showGrid: false as boolean,
      roundedItems: true as boolean,
      borderRadius: '16px' as string,
      currentTheme: 'Classic' as string,
      themes: {
        Classic: 'bg-white border border-solid border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
        Apple: 'bg-gray-100 dark:bg-gray-900 dark:text-white',
        Shadow: 'bg-white border-0 dark:bg-gray-900 shadow-sm',
      }
    },
    items: [] as Array<Item>
  }),
  getters: {
    getRowHeightForSquare(): number {
      return 1200 / this.settings.colNum
    }
  },
  actions: {
    addItem(item: Item) {
      if (item) {

        if (!item.x) {
          item.x = (this.items.length) % this.settings.colNum || 4
        }

        if (!item.y) {
          item.y = this.items.length + this.settings.colNum
        }

        if (!item.i) {
          item.i = Math.random().toString(36).slice(2)
        }

        console.log(item)
        this.items.push(item)
      } else {
        throw new Error('Item not pushed because it is null or empty')
      }
    },
    removeItem(item: Item) {
      const index = this.items.map(e => e.i).indexOf(item.i)
      this.items.splice(index,1)
    },
    incrementColNum() {
      if (this.settings.colNum < 24) this.settings.colNum ++
    },
    decrementColNum() {
      if (this.settings.colNum > 1) this.settings.colNum --
    },
    updateItemWidthById(width: number, id: any) {
      this.items.forEach((item) => {
        if (item.i === id) {
          item.w = width
        }
      })
    },
    updateItemHeightById(height: number, id: any) {
      this.items.forEach((item) => {
        if (item.i === id) {
          item.h = height
        }
      })
    }
  }
})
