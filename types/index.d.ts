export { Item, ImageItem, ChartItem }

declare global {
  interface Item {
    label: string
    componentId: number
    x?: number
    y?: number
    h?: number
    w?: number
    i?: any
    values: any
  }

  interface ImageItem {
    image: object
    url: string
  }

  interface ChartItem {
    chartOptions: Object
    series: Array<number>
  }
}