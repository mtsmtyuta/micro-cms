<template>
  <ul>
    <li v-for="content in magazine.contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData({ $microcms }) {
    const magazine = await $microcms.get({
      endpoint: 'magazine',
      // queries: { limit: 1 },
    })
    return {
      magazine,
    }
  },
}</script>