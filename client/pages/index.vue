<template>
  <div>
    <h1>index</h1>
    <ul>
      <li v-for="(user, i) in users" :key="i">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import '@nuxtjs/axios/types'

import { User } from '@common/UserInterface';

@Component
export default class YourComponent extends Vue {
  users: User[] = [];

  async asyncData({ $axios }: Context) {
    const { data: users } = await $axios.get('users');

    return { users };
  }
}
</script>
