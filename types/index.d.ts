import { type AnnotationItem } from '@unovis/ts'

export { Item, ImageItem, ChartItem, LineChartItem, DataRecord }

declare global {

  type DataRecord = { x: number; y: number }

  interface Item {
    label: string
    componentId: number
    x?: number
    y?: number
    h?: number
    w?: number
    i?: any
    values: any
    customTheme?: string
    customCss?: string
    preserveAspectRatio?: boolean
  }

  interface ImageItem {
    image: object
    url: string
  }

  interface ChartItem {
    chartOptions: Object
    series: Array<number>
  }

  interface LineChartItem {
    options: {
      axis: {
        x: {
          show: boolean
          label: string
          labelSize: number
          options: string[]
        }
        y: {
          show: boolean
          label: string
          labelSize: number
          options: string[]
        }
      }
      annotations: AnnotationItem[]
      crosshair: {
        show: boolean
        value: (d: DataRecord) => string
      }
      line: {
        type: string
        color: string
        width: number
        dashes: number[]
      }
    },
    data: DataRecord[]
  }
}
