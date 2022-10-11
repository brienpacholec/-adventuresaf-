<template>
  <div>
    {{post.title}}
    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const post = await $content('posts', params.slug).fetch()
    return {
      post
    }
  }
}
</script>