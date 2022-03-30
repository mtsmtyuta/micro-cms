<template>
  <main class="main">
    <h1 class="title">{{ magazine.title }}</h1>
    <p class="publishedAt">{{ magazine.publishedAt }}</p>
    <div class="post" v-html="magazine.body"></div>
  </main>
</template>

<script>
export default {
  async asyncData({ $microcms, params }) {
    const magazine = await $microcms.get({
      endpoint: `magazine`,
      contentId: `${params.id}`
    })
    return {
      magazine,
    }
  },
}</script>