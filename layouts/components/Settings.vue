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
      <v-list-item class="d-flex">

        <v-list-item-content class="pa-0">

          <v-switch
            :model="$vuetify.theme.dark"
            :label="`Theme: ${themeName}`"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          ></v-switch>
        </v-list-item-content>

      </v-list-item>

      <!-- Profile -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-account-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Pricing -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-currency-usd
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pricing</v-list-item-title>
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

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-logout-variant
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: 'Settings',
  computed: {
    themeName(){
      if(this.$vuetify.theme.dark){
        return 'Dark'
      } return 'Light'
    }
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