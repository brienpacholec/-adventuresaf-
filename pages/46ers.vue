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
  name: '46ers',
  async asyncData({ $content }) {
    const content = await $content('pages', '46ers').fetch()
    return {
      content,
    }
  }
}
</script>

