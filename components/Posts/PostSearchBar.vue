<template>
  <div>
    <multi-select
      :options="searchable"
      :selected-options="items"
      hide-selected-options
      placeholder="Search Posts"
      @select="onSelect"
    >
    </multi-select>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  name: 'PostSearchBar',
  components: {
    MultiSelect,
  },
  props: {
    tags: {
      type: Object,
      default: null,
    },
    locations: {
      type: Object,
      default: null,
    },
    activeFilters: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      searchText: '', // If value is falsy, reset searchText & searchItem
      items: [],
      lastSelectItem: {},
    }
  },
  computed: {
    searchable() {
      const options = []
      Object.keys(this.tags).forEach((tag) => {
        options.push({
          value: tag,
          text: tag,
          type: 'tags',
        })
      })
      Object.keys(this.locations).forEach((location) => {
        options.push({
          value: location,
          text: location,
          type: 'locations',
        })
      })
      return options
    },
  },
  watch: {
    activeFilters: {
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
      this.lastSelectItem = lastSelectItem
      this.$emit('searchUpdated', this.items)
    },
    // deselect option
    reset() {
      this.items = [] // reset
    },
  },
}
</script>

<style lang="scss"></style>
