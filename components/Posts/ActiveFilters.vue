<template>
  <div>
    <v-chip
      v-for="filter in activeFilters['tags']"
      :key="filter"
      outlined
      :ripple="false"
      close
      :color="getMappedTag(filter, 'color')"
      class="ma-1"
      @click:close="chipDismissed(filter, 'tags')"
    >
      <v-avatar left>
        <v-icon>{{getMappedTag(filter)}}</v-icon>
      </v-avatar>
      {{filter}}
    </v-chip>

    <v-chip
      v-for="filter in activeFilters['locations']"
      :key="filter"
      outlined
      :ripple="false"
      close
      class="ma-1"
      @click:close="chipDismissed(filter, 'locations')"
    >
      <v-avatar left>
        <v-icon>mdi-map-marker</v-icon>
      </v-avatar>
      {{filter}}
    </v-chip>
  </div>
</template>

<script>

import TagMap from '~/constants/TagMap'

export default {
  name: 'ActiveFilters',
  props: {
    activeFilters: {
      type: Object,
      default: null
    }
  },
  methods: {
    chipDismissed(filter, type){
    //   const currentFilters = this.activeFilters
    //   currentFilters[type].splice(currentFilters[type].indexOf(filter), 1)
      this.$emit('activeChipFilterDismissed', {
        filter,
        type
      })
    },
    getMappedTag(name){
      return TagMap[name]
    }
  }
}
</script>