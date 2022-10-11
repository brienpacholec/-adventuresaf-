<template>
  <div>
    <v-divider></v-divider>
    <v-list-item link :to="`/posts/${post.slug}`">
      <v-list-item-avatar rounded="0" height="150" width="150">
        <v-img :src="post.thumbnail"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>

        <v-list-item-title>{{post.title}}</v-list-item-title>
        <v-list-item-subtitle>by {{ post.author }} - {{ daysOld }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>
<script>
import TagMap from '~/constants/TagMap'

export default {
  name: 'ListItemPost',
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
