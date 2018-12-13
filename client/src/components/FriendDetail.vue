<template>
  <div>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-list-tile-avatar>{{ selectedLogIn }}
            </v-list-tile-avatar>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "FriendDetail",
  props: {
    selectedLogIn:String 
  }
};
</script>