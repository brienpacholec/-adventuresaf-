<template>
  <v-container fluid>
    <lead-post :post="leadPost"></lead-post>
    <br />
    <br />
    <br />
    <br />
    <v-row class="justify-center text-center">
      <v-col cols="12" md="6" sm="8">
        <h3>Older Posts</h3>
        <post-search-bar
          :tags="tags"
          :locations="locations"
          :active-filters="activeFilters"
          @searchUpdated="updateSearchFilters"
        ></post-search-bar>
      </v-col>
    </v-row>
    <v-responsive content-class="d-inline-flex justify-center flex-wrap">
      <post v-for="(post, index) in allPosts" :key="index" :post="post"></post>
    </v-responsive>
  </v-container>
</template>

<script>
import TagMap from '~/constants/TagMap'
import LeadPost from '~/components/Posts/LeadPost'
import Post from '~/components/Posts/Post'
import PostSearchBar from '~/components/Posts/PostSearchBar'

export default {
  name: 'Blog',
  components: {
    LeadPost,
    Post,
    PostSearchBar,
  },
  async asyncData({ $content }) {
    const posts = await $content('posts').fetch()
    return {
      posts,
    }
  },
  data: function () {
    return {
      leadPost: null,
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
    this.leadPost = this.posts[0]
    this.allPosts = this.posts.slice(1)
    this.allPosts.forEach((post) => {
      if (this.locations[post.location]) {
        this.locations[post.location].count++
      } else {
        this.locations[post.location] = {
          count: 1,
        }
      }
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
    })
    this.activePosts = this.allPosts
  },
  methods: {
    updateSearchFilters() {
      alert('updated')
    },
  },
}
</script>
