<template>
  <v-responsive class="">
    <home :lead-post="leadPost"></home>
  </v-responsive>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const posts = await $content('posts').fetch()
    return {
      posts,
    }
  },
  computed: {
    leadPost() {
      return this.posts[0]
    }
  }

  // head() {
  //   return {
  //     script: [
  //       { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
  //     ],
  //   }
  // },
}
</script>
