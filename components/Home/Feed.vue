<template>
  <section id="feed" class="pb-8">
    <v-container>
      <v-row align="center" justify="space-around">
        <v-col cols="12" class="text-center">
          <h1 class="font-weight-light" style="font-size: 1.5rem" >
            What's New
          </h1>
        </v-col>
      </v-row>
      <div class="d-flex flex-wrap justify-center">
        <instagram-feed></instagram-feed>
        <tik-tok-feed></tik-tok-feed>
      </div>
    </v-container>
  </section>
</template>

<script>
import InstagramFeed from '~/components/Home/InstagramFeed'
import TikTokFeed from '~/components/Home/TikTokFeed'
export default {
  name: 'Feed',
  components: {
    InstagramFeed,
    TikTokFeed
  }
}
</script>
    TikTokFeed