<template>
  <v-card class="mx-auto fit-content" max-width="600" :elevation="elevation">
    <v-img class="white--text align-end" height="400" :src="post.thumbnail" :class="{'image-border rounded-lg': imageRounded}">
    </v-img>
    <v-card-title>{{ post.title }}</v-card-title>

    <v-card-subtitle class="pb-0">
      {{ post.subtitle }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>by {{ post.author }} - {{ daysOld }}</div>
    </v-card-text>

    <v-card-actions>
      <NuxtLink :to="`/posts/${post.slug}`">
        <v-btn color="orange" class="mt-n5" text > Read More </v-btn>
      </NuxtLink>
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
    elevation: {
      type: Number,
      default: 5
    }
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
    imageRounded(){
      if(this.elevation === 0) {
        return true
      } return false
    }
  },
}
</script>

<style>
.fit-content {
  height: fit-content !important;
}
</style>
