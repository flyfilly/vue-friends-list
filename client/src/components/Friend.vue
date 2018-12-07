<template>
  <div>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img :src="friend.picture.thumbnail">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          <div>{{friend.name.first}} {{friend.name.last}}</div>
        </v-list-tile-title>
        <v-list-tile-sub-title v-html="friend.email"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <slot></slot>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider v-if="!last"></v-divider>
  </div>
</template>

<script>
export default {
  name: "Friend",

  props: {
    friend: Object,
    last: Boolean
  }
};
</script>