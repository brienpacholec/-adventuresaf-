<template>
  <div class="">
    <v-img :src="post.thumbnail" max-height="500"></v-img>
    <v-container class="mt-10 pt-10">
      <div class="text-h2 text-center">{{post.title}}</div>
      <div class="text-subtitle text-center">{{post.author}}</div>
      <div class="text-caption text-center">{{daysOld}}</div>
      <v-divider class="my-5"></v-divider>
      <nuxt-content :document="post" />
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const post = await $content('posts', params.slug).fetch()
    return {
      post
    }
  },
  computed: {
    daysOld() {
      const days = Math.ceil(
        Math.abs(new Date() - Date.parse(this.post.date)) /
          (1000 * 60 * 60 * 24)
      )
      if (days > 1) {
        return days + ' days ago'
      } else {
        return days + ' day ago'
      }
    },
  }
}
</script>