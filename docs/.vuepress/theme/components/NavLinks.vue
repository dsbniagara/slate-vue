<template>
  <nav
    class="nav-links"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link"
    >
      <dropdown 
        variant="link"
        v-if="item.type === 'links'"
        :item="item">
          <template v-slot:button>🤘</template>
          <NavLink  class="dropdown-item"
            v-for="i in item.items"
            :item="i"/>
        </dropdown>
      <NavLink
        v-else
        :item="item"
      />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg class="icon" viewBox="0 0 32 32">
        <path class="fill-light icon-hover-fill-primary" d="M15.999 0c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16s16-7.163 16-16c0-8.836-7.164-16-16-16zm4.482 28.189c-.092-1.252-.195-2.803-.201-3.431-.04-.482-.092-1.708-1.256-2.491 4.621-.387 6.82-2.941 6.978-6.316.132-1.922-.632-3.612-1.989-4.976.069-1.459-.044-3.188-.138-3.948-1.042-.3-3.472.983-4.151 1.532-1.432-.556-4.937-.751-7.067 0-1.51-1.062-3.229-1.718-4.166-1.535-.865 1.917-.309 3.729-.14 3.945-1.114 1.018-2.668 2.271-2.246 4.896.677 3.849 3.385 5.925 7.745 6.433-.93.19-1.087.884-1.165 1.185-2.928 1.208-3.765-.746-4.135-1.255-1.229-1.521-2.332-1.08-2.4-1.056-.066.024-.116.12-.109.166.062.328.731.661.764.688.907.676 1.243 1.897 1.45 2.245 1.301 2.139 4.325 1.252 4.354 1.27.002.187-.021 1.761-.039 2.986-5.514-1.506-9.571-6.536-9.571-12.527 0-7.18 5.82-13 13-13s13 5.82 13 13c0 5.603-3.55 10.362-8.518 12.189z"/>
      </svg>
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink, DropdownLink },

  computed: {
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav () {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },

    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
.nav-links
  display flex
  align-items center
  .repo-link 
    box-sizing: border-box
    svg 
      width 20px
      height 20px
      margin-top 5px
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
