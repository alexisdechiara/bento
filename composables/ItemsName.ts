export const useItemsName = () => {

  const items = [
    '', // 0
    'ItemImage', // 1
    'ItemRadialChart', // 2
    'ItemTitle', // 3
    'ItemText', //4
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
