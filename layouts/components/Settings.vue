<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template #activator="{ on, attrs }">
      <v-avatar
        size="40px"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-cog</v-icon>
      </v-avatar>
    </template>

    <v-list>

      <template v-if="user !== null">
        <div class="pb-3 pt-2">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="12"
            offset-y="12"
            class="ms-4"
            dot
          >
            <v-avatar size="40px">
              <!-- <v-img :src="require('@/assets/images/avatars/1.png')"></v-img> -->
              <v-icon>mdi-account-outline</v-icon>
            </v-avatar>
          </v-badge>
          <div
            class="d-inline-flex flex-column justify-center ms-3"
            style="vertical-align:middle"
          >
            <span class="text--primary font-weight-semibold mb-n1">
              {{user.username}}
            </span>
            <small class="text--disabled text-capitalize">{{user.role}}</small>
          </div>
        </div>

        <v-divider></v-divider>
      </template>

      <!-- ADMIN -->
      <v-list-item v-if="isAdmin" nuxt to="/admin/#/">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-note-multiple
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Content</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- FAQ -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-help-circle-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item class="d-flex">
        <v-list-item-content class="pa-0">
          <v-switch
            :model="$vuetify.theme.dark"
            :label="`Theme: ${themeName}`"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          ></v-switch>
        </v-list-item-content>
      </v-list-item>

      <template v-if="user !== null">
        <v-divider></v-divider>
        <v-list-item  link @click.prevent="logout">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              mdi-logout-variant
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Settings',
  computed: {
    themeName(){
      if(this.$vuetify.theme.dark){
        return 'Dark'
      } return 'Light'
    },
    ...mapGetters({
      user: 'auth/user'
    }),
    isAdmin(){
      return this.user?.role === 'Admin'
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }

}

</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>