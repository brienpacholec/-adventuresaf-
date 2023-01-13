<template>
  <div class="">
    <v-img :src="post.thumbnail" max-height="500"></v-img>
    <v-container>

      <div class="header my-5">
        <div class="text-h2 text-center">{{post.title}}</div>
        <div class="text-subtitle text-center">{{post.author}}</div>
        <div class="text-caption text-center">{{daysOld}}</div>
      </div>

      <v-divider></v-divider>

      <div class="content my-5">
        <nuxt-content :document="post" />
      </div>

      <div v-if="post.galleryImages !== undefined">
        <v-divider></v-divider>

        <div v-if="post.galleryImages.length > 0" class="gallery my-5">
          <div class="text-h2 text-center mb-5">Photo Gallery</div>
          <v-row>
            <v-col
              v-for="(img, index) in post.galleryImages"
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
        </div>
      </div>
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
    }
  }
}
</script>

<style>
.nuxt-content {
  display: flex;
  flex-direction: column;
}
p:has(img) {
  text-align: center;
}

.nuxt-content img {
  border: 1px solid rgba(0 0 0 /10%);
  border-radius: 1rem;
  max-height: 500px;
}
</style>