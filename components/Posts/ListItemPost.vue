<template>
  <div class="list-item-post my-1">
    <NuxtLink :to="`/posts/${post.slug}`">
      <v-list-item link >
        <v-list-item-avatar rounded="0" height="150" width="150">
          <v-img :src="post.thumbnail" class="image-border rounded-lg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{post.title}}</v-list-item-title>
          <v-list-item-subtitle>by {{ post.author }} - {{ daysOld }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </NuxtLink>
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

<style>
/* .list-item-post {
  border: 5px solid rgba(0 0 0 /5%);
} */

</style>

