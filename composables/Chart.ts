export const useLineChart = () => {
  const labelOptions = [
      'Grid line',
      'Domain line',
      'Tick line',
      'Tick label'
    ]

    const types = [
      {
        label: 'Basic',
        value: 'basis',
        icon: 'i-carbon-chart-line-smooth'
      },
      {
        label: 'Linear',
        value: 'linear',
        icon: 'i-carbon-chart-line'
      },
      {
        label: 'Step',
        value: 'step',
        icon: 'i-carbon-chart-stepper'
      }
  ]

  return {
    labelOptions,
    types
  }
}
