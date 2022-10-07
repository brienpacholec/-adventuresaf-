<template>
  <v-card
    :class="{
      'ma-3': $vuetify.breakpoint.smAndDown,
      'ma-2': $vuetify.breakpoint.mdAndUp,
    }"
    :max-width="350"
    elevation="3"
  >
    <v-img class="white--text align-end" height="200px" :src="post.thumbnail">
      <v-card-title class="justify-center pa-0 grey-transparent-bg">{{
        post.title
      }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ post.subtitle }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>by {{ post.author }} - {{ daysOld }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn color="orange" icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>

      <v-btn color="orange" text> Read More </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TagMap from '~/constants/TagMap'

export default {
  name: 'LeadPost',
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  computed: {
    daysOld() {
      const days = Math.ceil(
        Math.abs(new Date() - Date.parse(this.post.date)) /
          (1000 * 60 * 60 * 24)
      )
      if (days > 1) {
        return days + ' days old'
      } else {
        return days + ' day old'
      }
    },
    mappedTags() {
      const mappedTags = []
      this.post.tags.forEach((e) => {
        mappedTags.push({
          name: e,
          icon: TagMap[e].icon,
        })
      })
      return mappedTags
    },
  },
}
</script>

<style>
.grey-transparent-bg {
  background-color: rgb(0 0 0 / 45%) !important;
}
</style>
