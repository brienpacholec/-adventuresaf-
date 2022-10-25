<template>
  <v-container>
    <div class="text-h2 text-center mb-5">{{gallery.title}}</div>
    <nuxt-content :document="gallery" />
    <v-row>
      <v-col
        v-for="(img, index) in gallery.galleryImages"
        :key="index"
        class="d-flex child-flex"
        cols="12" lg="3" sm = "6"
      >
        <v-img
          :src="img"
          :lazy-src="img"
          max-height="500"
          class="grey lighten-2 image-border border-radius"
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
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const gallery = await $content('galleries', params.slug).fetch()
    return {
      gallery
    }
  },

}
</script>

<style>
.nuxt-content img {
  width: stretch;
  max-height: 900px;
  border: 1px solid rgba(0 0 0 /10%);
  border-radius: 1rem;
}
</style>