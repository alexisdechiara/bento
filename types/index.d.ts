import { type AnnotationItem } from '@unovis/ts'

export { Item, ImageItem, ChartItem, LineChartItem, DataRecord }

declare global {

  type DataRecord = {
    x: number
    y1: number
  }

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

  type annotationChart = {
    title?: string
    titleSize?: number
    description?: string
  }

  type chartTooltip = {
    show: boolean
    content: (d: DataRecord) => string
  }

  type chartCrosshair = {
    show: boolean
    content: (d: DataRecord) => string
  }

  type chartAxis = {
    x?: {
      show?: boolean
      label?: string
      labelSize?: number
      options?: string[]
    }
    y?: {
      show?: boolean
      label?: string
      labelSize?: number
      options?: string[]
    }
  }

  type lineChart = {
    type?: string
    color?: string
    width?: number
    dashes?: number[]
  }

  type barChart = {
    orientation?: string
    roundedCorners?: boolean | number
    groupWidth?: number
    groupPadding?: number
    barPadding?: number
    minimumBarHeight?: number
  }

  interface BarChartItem {
    options: {
      axis: chartAxis
      annotations: AnnotationItem[]
      tooltip: chartTooltip
      colors: string[]
      bar: barChart
    }
    data: DataRecord[]
    x?: (d: DataRecord) => number
    y?: ((d: DataRecord) => number)[]
  }

  interface LineChartItem {
    options: {
      axis: chartAxis
      annotations: AnnotationItem[]
      crosshair: chartCrosshair
      line: lineChart
      colors: string[]
    }
    data: DataRecord[]
    x?: (d: DataRecord) => number
    y?: ((d: DataRecord) => number)[]
  }
}
