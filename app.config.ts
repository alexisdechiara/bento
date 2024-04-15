export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true
    },
    primary: 'indigo',
    gray: 'zinc',
    variables: {
      light: {
        background: 'var(--color-gray-50)'
      },
      dark: {
        background: 'var(--color-gray-900)'
      }
    },
    button: {
      default: {
        size: 'md',
        color: 'black'
      }
    },
  }
})
