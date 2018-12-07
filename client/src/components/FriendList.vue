<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <v-card>
          <v-list v-if="friends.length > 0" two-line>
            <template v-for="(friend, index) in friends">
              <Friend :key="index" :friend="friend" :last="index === friends.length -1">
                <v-btn @click="removeFriend(index)" icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </Friend>
            </template>
          </v-list>
          <v-alert v-else :value="true" color="blue-grey darken-3">
            <v-icon x-large class="white--text" id="sad">fa-sad-tear</v-icon>
            <h3>You dont have any friends</h3>
          </v-alert>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Friend from "./Friend";
export default {
  props: {
    friends: Array
  },

  components: {
    Friend
  },

  methods: {
    removeFriend(index) {
      this.friends.splice(index, 1);
      window.localStorage.setItem("friends", JSON.stringify(this.friends));
    }
  },

  watch: {}
};
</script>

<style>
#sad {
  margin-left: 0.5em;
}
</style>
