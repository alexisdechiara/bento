<template>
  <div class="max-h-full h-fit max-w-full overflow-auto rounded-t mt-1.5">
    <UTable :key="componentKey" :sort-button="{ icon: 'i-heroicons-arrows-up-down-20-solid', color: 'gray', variant: 'soft', square: true, class:'text-black font-semibold' }" sort-asc-icon="i-heroicons-bars-arrow-down-20-solid" sort-desc-icon="i-heroicons-bars-arrow-up-20-solid" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No rows' }" :rows="rows" :columns="columns" :ui="{ wrapper:'overflow-visible', base:'table-auto', thead: 'bg-gray-50 dark:bg-gray-700', th: { base: 'text-nowrap' }, td: { padding: 'p-0' } }">
      <template v-for="key in columns.map((c) => c.key).filter((k) => k.startsWith('y'))" :key="key" #[`${key}-header`]="{ column }">
        <UDropdown :items="headerActions(column)" :popper="{ placement: 'bottom' }">
          <UButton color="gray" variant="soft" class="group text-black font-semibold">
            <template #leading>
              <span class="rounded-full size-4" :style="{ backgroundColor: colors[columns.findIndex((c) => c.key === column.key)-1] }" />
            </template>
            <template #trailing>
              <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="invisible group-hover:visible" />
            </template>
            {{ column.label }}
          </UButton>
        </UDropdown>
      </template>
      <template #x-data="{ row }">
        <div class="bg-gray-50 dark:bg-gray-700">
          <UInput v-model.lazy="row.x" type="number" variant="none" color="gray" class="p-1 w-full border-r font-semibold text-black" />
        </div>
      </template>
      <template v-for="key in columns.map((c) => c.key).filter((k) => k.startsWith('y'))" :key="key" #[`${key}-data`]="{ row }">
        <UInput v-model.lazy="row[key]" type="number" variant="none" class="p-1 w-full border-r" />
      </template>
      <template #actions-data="{ row, index }">
        <UDropdown :items="tableActions(row, index)">
          <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
const rows = defineModel<Array<any>>('rows')
const columns = defineModel<Array<any>>('columns')
const x = defineModel<(d: DataRecord) => number>('x')
const y = defineModel<((d: DataRecord) => number)[]>('y')
const colors = defineModel<string[]>('colors')

const componentKey = ref<number>(0)

const emit = defineEmits(['updated'])

let nbY = 1

function headerActions(column: any) {
  const index = columns.value.findIndex((c) => c.key === column.key)
  return [
    [
      {
        label: 'Rename',
        icon: 'i-fluent-rename-20-filled',
        click: () => columns.value.find((c) => c.key === column.key).label = prompt('Enter new label', columns.value.find((c) => c.key === column.key).label)
      }
    ],
    [
      {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid',
        click: () => addYColumn(index + 1, column)
      },
      {
        label: 'Move left',
        icon: 'i-heroicons-arrow-left-circle-20-solid',
        disabled: index < 2,
        click: () => moveYColumn(index, index - 1)
      },
      {
        label: 'Move right',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
        disabled: index === columns.value.length - 2,
        click: () => moveYColumn(index, index + 1)
      }
    ],
    [
      {
        label: 'Add',
        icon: 'i-heroicons-plus-circle-20-solid',
        click: () =>  addYColumn(columns.value.length - 1)
      },
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
          removeYColumn(index)
        }
      }
    ]
  ]
}

const tableActions = (row: any, index: number) => [
  [{
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      rows.value.splice(index + 1, 0, { ...row })
    }
  },{
    label: 'Move up',
    icon: 'i-heroicons-arrow-up-circle-20-solid',
    disabled: index === 0,
    click: () => {
      if (index > 0) {
        rows.value.splice(index - 1, 0, rows.value.splice(index, 1)[0])
      }
    }
  },{
    label: 'Move down',
    icon: 'i-heroicons-arrow-down-circle-20-solid',
    disabled: index === rows.value.length - 1,
    click: () => {
      if (index < rows.value.length - 1) {
        rows.value.splice(index + 1, 0, rows.value.splice(index, 1)[0])
      }
    }
  }], [{
    label: 'Add',
    icon: 'i-heroicons-plus-circle-20-solid',
    click: () => {
      rows.value.push({
        x: null,
        y: null,
      })
    }
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      rows.value.splice(index, 1)
    }
  }]
]

function incrementNbY() {
  nbY = nbY + 1
}

function moveYColumn(from: number, to: number) {
  columns.value.splice(to, 0, columns.value.splice(from, 1)[0])
  rows.value.forEach((d) => {
    const [fromKey, toKey] = [columns.value[from].key, columns.value[to].key]
    const [fromValue, toValue] = [d[fromKey], d[toKey]]
    d[fromKey] = toValue
    d[toKey] = fromValue
  })
  colors.value.splice(to - 1, 0, colors.value.splice(from -1, 1)[0])
  emit('updated')
  componentKey.value ++
}

function addYColumn(index: number, column?: any) {
  incrementNbY()
  const key = 'y' + nbY
  columns.value.splice(index, 0, {
    key: key,
    label: column ? 'Copy of ' + column.label.charAt(0).toLowerCase() + column.label.slice(1) : 'Ordonates (Y' + nbY + ')'
  })
  rows.value.forEach((d) => {
    d['y' + nbY] = column ? d[column.key] : null
  })
  y.value.splice(index, 0, (d) => d[key])
  emit('updated')
  componentKey.value ++
}

function removeYColumn(index: number) {
  const key = columns.value[index].key
  columns.value.splice(index, 1)
  rows.value.forEach((d) => {
    delete d[key]
  })
  y.value.splice(index - 1, 1)
  emit('updated')
  componentKey.value ++
}

</script>
