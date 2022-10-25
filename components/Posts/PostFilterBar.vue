<template>
  <div>
    <multi-select
      :options="searchable"
      :selected-options="items"
      hide-selected-options
      :placeholder="placeholder"
      @select="onSelect"
    >
    </multi-select>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  name: 'PostFilterBar',
  components: {
    MultiSelect,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
    filters: {
      type: Object,
      default: null,
    },
    active: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      searchText: '', // If value is falsy, reset searchText & searchItem
      items: [],
    }
  },
  computed: {
    searchable() {
      const options = []
      Object.keys(this.filters).forEach((filter) => {
        options.push({
          value: filter,
          text: filter,
          type: this.type
        })
      })
      return options
    },
    placeholder(){
      return `Filter by ${this.type}`
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(newVal) {
        const toRemove = []
        this.items.forEach((currentlySelected) => {
          const foundInCurrentTags = newVal.tags.includes(
            currentlySelected.text
          )
          const foundInCurrentLocations = newVal.locations.includes(
            currentlySelected.text
          )
          if (!foundInCurrentTags && !foundInCurrentLocations) {
            toRemove.push(currentlySelected)
          }
        })
        toRemove.forEach((remove) => {
          this.items.splice(this.items.indexOf(remove), 1)
        })
      },
      deep: true,
    },
  },
  methods: {
    onSelect(items, lastSelectItem) {
      this.items = items
      this.$emit('searchUpdated', {
        'type': this.type,
        'items': this.items
      })
    },
    // deselect option
    reset() {
      this.items = [] // reset
    },
  },
}
</script>
