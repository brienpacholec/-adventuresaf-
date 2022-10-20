<template>
  <v-container class="mt-12">
    <div class="header">
      <div class="text-h2 text-center">{{content.title}}</div>
    </div>

    <div class="content my-5">
      <nuxt-content :document="content" />
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'Posts',
  async asyncData({ $content }) {
    const content = await $content('pages', 'getting-started').fetch()
    return {
      content,
    }
  }
}
</script>

<style>
.grey-bg {
  background: rgb(0 0 0 / 25%);
  border-radius: 1rem;
  max-width: 450px;
}
</style>
