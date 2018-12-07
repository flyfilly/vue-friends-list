<template>
  <v-app light>
    <v-toolbar app color="blue-grey darken-3" class="white--text">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My</span>
        <span>Friends</span>
        <span class="font-weight-light">List</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <v-btn @click="meetSomeone('male')" slot="activator" icon class="white--text">
          <v-icon>fa-mars</v-icon>
        </v-btn>
        <span>Introduce me to a new Dude!</span>
      </v-tooltip>

      <v-tooltip left>
        <v-btn @click="meetSomeone('female')" slot="activator" icon class="white--text">
          <v-icon>fa-venus</v-icon>
        </v-btn>
        <span>Introduce me to a new Lady!!</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <FriendList v-bind:friends="friends"/>
    </v-content>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      :color="toast"
    >{{ text }}</v-snackbar>
  </v-app>
</template>

<script>
import FriendList from "./components/FriendList";
import axios from "axios";

export default {
  name: "App",
  components: {
    FriendList
  },

  data() {
    return {
      friends: [],
      snackbar: false,
      y: "bottom",
      x: "left",
      mode: "",
      timeout: 3000,
      text: "",
      toast: ""
    };
  },

  mounted() {
    this.friends = JSON.parse(window.localStorage.getItem("friends")) || [];
  },

  methods: {
    async meetSomeone(gender) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `http://localhost:1331/friend/${gender}`,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2UiOiJkZW1vIiwiaWF0IjoxNTQ0MTMzNjc2fQ.bMZTSEdftqNjzlkRBDF9fuFJWPd5tv3x84ATVPxjVuE"
          }
        });
        this.friends.push(data.friend);
        window.localStorage.setItem("friends", JSON.stringify(this.friends));
      } catch (error) {
        this.toast = "red";
        this.text = `An error has ocurred: ${error.message}`;
        this.snackbar = true;
      }
    }
  },

  watch: {
    friends() {
      this.toast = "green";
      this.text = "Your Friends List has been updated!";
      this.snackbar = true;
    }
  }
};
</script>
