<template>
  <div class="mb-10">
    <v-parallax dark :src="backgroundImage" height="750">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8" class="grey-bg">
              <h1 class="text-sm-h4 text-md-h3 text-h5">Adventures AF</h1>
              <h1 class="font-weight-light text-body-1">
                Step into the world of outdoors!<br />
                From quick day hikes, to crazy backpacking trips<br />
                come checkout what we have in store!
              </h1>
              <v-btn
                rounded
                outlined
                large
                dark
                class="mt-5"
                @click="$vuetify.goTo('#posts')"
              >
                Explore More
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="/shared/waves_border.svg" />
      </div>
    </v-parallax>

    <v-container id="posts" class="posts" fluid>
      <v-row align="center" justify="space-around">
        <v-col cols="12" class="text-center">
          <h1 class="font-weight-light display-2">Latest Posts</h1>
          <h1 class="font-weight-light" style="font-size: 1.5rem" >
            Checkout out some of our most recent adventures below.
          </h1>
        </v-col>
      </v-row>
      <v-card class="pa-5 mt-5" elevation="5">
        <v-row>
          <v-col cols="12" md="7">
            <lead-post :post="leadPost" :elevation="0" class="ma-0"></lead-post>
          </v-col>
          <v-col cols="12" md="5">
            <v-list nav>
              <list-item-post v-for="(post, index) in previousPosts" :key="index" :post="post"></list-item-post>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <div class="svg-border-waves">
      <img src="/shared/wave2.svg" />
    </div>
  </div>
</template>

<script>
import LeadPost from '~/components/Posts/LeadPost'
import ListItemPost from '~/components/Posts/ListItemPost'
export default {
  components: {
    LeadPost,
    ListItemPost
  },
  data() {
    return {
      backgroundImage: null,
      leadPost: null,
      previousPosts: null,
      videoId: 'i8IvvHJssWE',
    }
  },
  async fetch() {

    const response = await this.$content('posts')
      .sortBy('date', 'desc')
      .limit(4)
      .fetch()

    const settings = await this.$content('pages', 'general-settings').fetch()
    this.backgroundImage = settings.generalSettings.homeCoverImage

    this.leadPost = response[0]
    this.previousPosts = response.slice(1,4)
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause()
      }
    },
  },
  methods: {
    ready(event) {
      this.player = event.target
    },
    playing(event) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = 'another video id'
    },
    stop() {
      this.player.stopVideo()
    },
    pause() {
      this.player.pauseVideo()
    },
  },
}
</script>

<style lang="scss">

.posts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.grey-bg {
  background: rgb(0 0 0 / 25%);
  border-radius: 1rem;
  max-width: 450px;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
</style>

