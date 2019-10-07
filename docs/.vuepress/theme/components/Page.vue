<template>
  <main class="page">
    <slot name="top" />

    <ClientOnly>
      <Content class="theme-default-content" />
    </ClientOnly>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;

  .theme-default-content>h2:not(:first-child) {
      margin-top: 3rem;
  }
}
</style>
