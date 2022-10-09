<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      src="/img/bgDrawer.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="/img/logo.png" alt="Logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">Adventures</v-list-item-title>
            <v-list-item-subtitle>AF</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="(i, index) in items"
          :key="index"
          link
          :to="i.to"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              i.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="color"
      :flat="flat"
      :elevation="elevation"
      dark
      class="px-2"
      :class="{ expand: flat }"
    >
      <v-app-bar-nav-icon
        v-if="isXs"
        class="text--text"
        @click.stop="drawer = !drawer"
      />
      <v-spacer v-if="isXs"></v-spacer>

      <!-- <v-toolbar-title class="d-flex align-center mr-2">
        <div class="text--text">Adventures AF {{flat}}</div>
      </v-toolbar-title> -->

      <div v-if="!isXs">
        <v-btn
          v-for="(i, index) in items"
          :key="index"
          :to="i.to"
          text
          class="mx-1"
        >
          <span class="mx-1 text--text">{{ i.title }}</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-if="!isXs">
        <template v-if="user === null">
          <v-btn  text @click.prevent="openLogin">
            <span class="mx-1 text--text">Login</span>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn rounded color="info" @click.prevent="openSignup">
            <span class="mx-1">Register</span>
          </v-btn>
        </template>

      </div>

      <settings></settings>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Settings from '~/layouts/components/Settings.vue'

export default {
  components: {
    Settings
  },
  props: {
    color: {
      type: String,
      default: 'secondary',
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    elevation: 0,
    drawer: null,
    isXs: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Home',
        to: '/',
      },
      {
        icon: 'mdi-hiking',
        title: 'Adventures',
        to: '/adventures',
      },
      {
        icon: 'mdi-newspaper',
        title: 'Travel Blog',
        to: '/blog',
      },
      {
        icon: 'mdi-image-multiple',
        title: 'Photos',
        to: '/photos',
      },
      {
        icon: 'mdi-image-filter-hdr',
        title: '46ers',
        to: '/46ers',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false
        }
      }
    },
    flat() {
      if(this.flat){
        this.elevation = Number(0)
      } else {
        this.elevation = 10
      }

    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850
    },
    ...mapActions({
      openLogin: 'auth/openLogin',
      openSignup: 'auth/openSignup',
      logout: 'auth/logout'
    })
  },
}
</script>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>
