<template>
  <v-container class="mt-12">
    <div class="header my-5">
      <div class="text-h2 text-center">Photo Galleries</div>
    </div>

    <v-row class="justify-center">
      <v-col
        v-for="(gallery, index) in galleries"
        :key="index"
        class="d-flex child-flex flex-column tex"
        cols="12" lg="4" md="6" sm="8"
      >
        <NuxtLink
          :to="`/photos/${gallery.slug}`"
        >
          <v-card
            elevation="5"
            max-height="500"
            min-width="300"
          >
            <v-img
              :src="gallery.galleryImages[0]"
              :lazy-src="gallery.galleryImages[0]"
              height="300"
              class="grey lighten-2 white--text align-end"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <v-card-title class="grey-bg">{{gallery.title}},<br>{{gallery.location}}</v-card-title>

            </v-img>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

export default {
  name: 'Posts',
  async asyncData({ $content }) {
    const galleries = await $content('galleries')
      .sortBy('title', 'desc')
      .fetch()
    return {
      galleries,
    }
  }
}
</script>

