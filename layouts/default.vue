<template>
  <v-app>
    <navigation :color="color" :flat="flat" class="mt-0"></navigation>
    <v-main :class="{'pa-0': isHome}">
      <Nuxt />
    </v-main>
    <v-scale-transition>
      <v-btn
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon class="text--text">mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <v-footer :absolute="!fixed" app> </v-footer>
  </v-app>
</template>

<script>

export default {

  data: () => ({
    fab: null,
    color: null,
    flat: true,
    fixed: false,
  }),
  computed: {
    themeToggleIcon() {
      if (this.$vuetify.theme.dark) {
        return 'mdi-weather-sunny'
      }
      return 'mdi-moon-waxing-crescent'
    },
    isHome(){
      return this.$route.path === '/'
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = 'secondary'
        this.flat = false
      } else {
        if(this.isHome){
          this.color = 'transparent'
        }
        this.flat = true
      }
    },
  },
  created(){
    if(this.isHome){
      this.color =  'transparent'
    } else {
      this.color = 'secondary'
    }
  },

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const top = window.pageYOffset || 0
      if (top <= 60) {
        if(this.isHome){
          this.color = 'transparent'
        }
        this.flat = true
      }
      this.fab = top > 60
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
  },
}
</script>

<style scoped>
.v-main {
  background-image: url('/img/bgMain.png');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
