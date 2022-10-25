<template>
  <v-container fluid class="mt-12">
    <v-row class="justify-center text-center">
      <v-col cols="12" md="6" sm="8">
        <div class="text-h4">Adventure's a Post Away</div>
      </v-col>
    </v-row>
    <v-row class="justify-center text-center">
      <v-col cols="12" lg="3" md="4" sm="6" class="my-0">
        <post-filter-bar
          type="tags"
          :filters="tags"
          :active="activeFilters"
          @searchUpdated="updateSearchFilters"
        />
      </v-col>
      <v-col cols="12" lg="3" md="4" sm="6" class="my-0">
        <post-filter-bar
          type="locations"
          :filters="locations"
          :active="activeFilters"
          @searchUpdated="updateSearchFilters"
        />
      </v-col>
    </v-row>
    <v-row class="justify-center text-center">
      <v-col cols="12" lg="3" md="4" sm="6" class="my-0">
        <active-filters
          :active-filters="activeFilters"
          @activeChipFilterDismissed="updateSearchFiltersByChipDismissal"
        />
      </v-col>
    </v-row>
    <v-responsive content-class="d-inline-flex justify-center flex-wrap my-5">
      <post v-for="(post, index) in activePosts" :key="index" :post="post"></post>
    </v-responsive>
  </v-container>
</template>

<script>
import TagMap from '~/constants/TagMap'
import Post from '~/components/Posts/Post'
import PostFilterBar from '~/components/Posts/PostFilterBar'
import ActiveFilters from '~/components/Posts/ActiveFilters'

export default {
  name: 'Posts',
  components: {
    Post,
    PostFilterBar,
    ActiveFilters
  },
  async asyncData({ $content }) {
    const posts = await $content('posts')
      .sortBy('date', 'desc')
      .fetch()
    return {
      posts,
    }
  },
  data: function () {
    return {
      allPosts: null,
      activePosts: [],
      activeFilters: {
        tags: [],
        locations: [],
      },
      tags: {},
      locations: {},
    }
  },
  created() {
    this.allPosts = this.posts
    this.allPosts.forEach((post) => {
      if(post.location !== undefined){
        if (this.locations[post.location]) {
          this.locations[post.location].count++
        } else {
          this.locations[post.location] = {
            count: 1,
          }
        }
      }
      if(post.tags !== undefined){
        post.tags.forEach((tag) => {
          if (this.tags[tag]) {
            this.tags[tag].count++
          } else {
            this.tags[tag] = {
              count: 1,
              icon: TagMap[tag],
            }
          }
        })
      }
    })
    this.activePosts = this.allPosts
  },
  methods: {
    updateActivePosts(){
      this.activePosts = []
      if(this.activeFilters.tags.length === 0 && this.activeFilters.locations.length === 0){
        this.activePosts = this.allPosts
      } else {
        this.allPosts.forEach(post => {
          if(this.activeFilters.locations.includes(post.location)){
            this.activePosts.push(post)
          } else if (post.tags !== undefined){
            if(this.activeFilters.tags.some(item => post.tags.includes(item))){
              this.activePosts.push(post)
            }
          }
        })
      }

    },
    updateSearchFilters(e) {
      e.items.forEach(item => {
        if(!this.activeFilters[e.type].includes(item.value)){
          this.activeFilters[e.type].push(item.value)
        }
      })
      this.updateActivePosts()
    },
    updateSearchFiltersByChipDismissal(e){
      this.activeFilters[e.type].splice(this.activeFilters[e.type].indexOf(e.filter), 1)
      this.updateActivePosts()

    }
  },
}
</script>
