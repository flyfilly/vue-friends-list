<template>
  <v-app light>
    <v-toolbar app color="blue-grey darken-3" class="white--text">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My</span>
        <span>Friends</span>
        <span class="font-weight-light">List</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-toolbar-title class="text-uppercase">Drop Down</v-toolbar-title>
<!-- v-select sends item-text="name.fullname" however it is better to send an entire 
friend by indiced json.                                                              -->
        <v-select 
        v-model="selectedLogIn"
        :items="friends" 
        item-text="name.fullname" 
        item-value="" 
        single-line 
        menu-props="auto"
        prepend-icon="group_work" 
        label="Select your friend"
        >
        </v-select>
<!-- ******************************************************************************* -->

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
      <br>
      <v-layout text-xs-center wrap>
        <v-flex mb-4>
          <v-card>
          <li>
<!-- The button to run testFriend to see the data by alert.   -->
            <v-btn 
            @click="testFriend(selectedLogIn, friends)" 
            slot="activator" 
            icon class="black--text">{{ selectedLogIn }}</v-btn>
<!-- Dear Felipe, I try to send an entire friend json to run a module FriendDetail,     
would you please show me how to do so? 12.13,Thursday by Yuriko                 -->
              <FriendDetail :selectedLogIn ='selectedLogIn'/>
<!-- ******************************************************************************* -->
          </li>
          </v-card>
        </v-flex>
      </v-layout>
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
import FriendDetail from "./components/FriendDetail";
import axios from "axios";

export default {
  name: "App",
  props: {
    friend: Array
  },
  components: {
    FriendList,
    FriendDetail
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
      toast: "",
      selectedLogIn: ""
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
        //** Add fullName to the each friend, so that will show on v-select option. **/
        data.friend.name['fullname'] = data.friend.name.first+' '+data.friend.name.last;
        this.friends.push(data.friend);
        window.localStorage.setItem("friends", JSON.stringify(this.friends));
      } catch (error) {
        this.toast = "red";
        this.text = `An error has ocurred: ${error.message}`;
        this.snackbar = true;
      }
    },
    testFriend(selectedLogIn,friends){
      //** Since I failed to grab the friend json, I tried to studay how the data was sent from v-select. **/
      var test = friends[friends.map(
        function(e){
          return e.name.first+' '+e.name.last;
        }).indexOf(selectedLogIn)];
      alert(test.name.first);
      return test;
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
