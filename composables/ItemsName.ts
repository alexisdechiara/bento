export const useItemsName = () => {

  const items = [
    '', // 0
    'Image', // 1
    'RadialChart', // 2
    'Title', // 3
    'Text', //4
    'Placeholder', //5
  ]

  function getItemNameById(id: number) {
    return 'Item' + items[id]
  }

  function getItemIdByName(name: string) {
    return items.findIndex( item => item.toLowerCase() === name.toLowerCase() )
  }

  return {
    getItemNameById,
    getItemIdByName
  }
}
