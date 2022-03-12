<template>
  <div>
    <h1>index</h1>
    <button @click="fetchUsers()" :disabled="loading">refresh</button>
    <ul class="user-list">
      <li v-for="(user, i) in users" :key="i">
        <span>{{ user.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.user-list {
  list-style: none;
  padding-left: 0;
}
</style>

<script lang="ts">
import { User } from '@common/UserInterface';
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class YourComponent extends Vue {
  users: User[] = [];
  loading = false;

  async fetch() {
    return this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.loading = true;

      this.users = (await this.$axios.get('users'))?.data ?? [];
    } finally {
      this.loading = false;
    }
  }
}
</script>
