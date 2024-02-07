export const useItemsName = () => {

  const items = [
    '',
    'ItemImage',
    'ItemRadialChart',
  ]

  function getItemNameById(id: number) {
    return items[id]
  }

  function getItemIdByName(name: string) {
    return items.indexOf(name)
  }

  return {
    getItemNameById,
    getItemIdByName
  }
}
