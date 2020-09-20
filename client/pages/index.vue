<template>
  <div>
    <h1>index</h1>
    <ul>
      <li v-for="(user, i) in users" :key="i">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { User } from '@common/UserInterface';

@Component
export default class YourComponent extends Vue {
  users: User[] = [];

  async fetch() {
    this.users = (await this.$axios.get('users'))?.data ?? [];
  }
}
</script>
