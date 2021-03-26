<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <!-- <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      > -->
      <svg  width="138.143" height="33.987" viewBox="0 0 138.143 33.987">
        <g transform="translate(-43.857 -42.254)">
          <path d="M3.332.014H5.5L8.876-8.008H6.538L4.424-2.394,2.3-8.008H-.014Zm9.016.154a2.511,2.511,0,0,0,2.464-1.442V0H16.94V-8.008H14.812V-3.92c0,1.484-.476,2.268-1.708,2.268s-1.736-.672-1.736-2.128V-8.008H9.24v4.424C9.24-1.064,10.206.168,12.348.168ZM22.316.154a3.663,3.663,0,0,0,3.808-2.366L24.178-2.45a1.777,1.777,0,0,1-1.806.994,1.944,1.944,0,0,1-2.1-2.058h5.922c.252-2.8-1.3-4.648-3.948-4.648A3.939,3.939,0,0,0,18.144-4,3.92,3.92,0,0,0,22.316.154Zm-2-5.068A1.849,1.849,0,0,1,22.3-6.664a1.809,1.809,0,0,1,1.946,1.75Z" transform="translate(149 63)" fill="#41b883"/>
          <path d="M6.216.21C9.576.21,11.7-1.281,11.7-3.675c0-4.809-7.6-2.667-7.6-5.061,0-.8.777-1.26,2.1-1.26a2.459,2.459,0,0,1,2.352,1.3L11.4-9.2c-.588-1.869-2.814-3.024-5.292-3.024-2.982,0-5.124,1.428-5.166,3.591C.9-3.822,8.484-5.775,8.484-3.381c0,.84-.819,1.323-2.247,1.323A2.92,2.92,0,0,1,3.4-3.549L.5-3.066C1.092-1.113,3.234.21,6.216.21ZM12.852,0h3.213V-15.918H12.852ZM22.911.273a4.071,4.071,0,0,0,3.822-2.247V-.021h3.192V-12.012H26.733v2.037a4.049,4.049,0,0,0-3.843-2.268c-2.982,0-5.313,2.2-5.313,6.237S19.929.273,22.911.273Zm.9-2.667c-1.785,0-3.045-1.323-3.045-3.612,0-2.268,1.26-3.591,3.024-3.591,1.785,0,3.045,1.344,3.045,3.591C26.838-3.738,25.578-2.394,23.814-2.394ZM37.464.189A8.922,8.922,0,0,0,39.4-.021l-.42-2.415a7.3,7.3,0,0,1-.966.105c-1.575,0-2.163-.714-2.163-2.751V-9.6h3.276v-2.415H35.847v-2.835l-3.213.672v2.163h-1.7V-9.6h1.7v4.809C32.634-1.134,34.188.189,37.464.189Zm8.295.042c2.9,0,4.851-1.218,5.712-3.549l-2.919-.357a2.665,2.665,0,0,1-2.709,1.491,2.916,2.916,0,0,1-3.15-3.087h8.883c.378-4.2-1.953-6.972-5.922-6.972A5.909,5.909,0,0,0,39.5-6.006,5.881,5.881,0,0,0,45.759.231Zm-3-7.6A2.774,2.774,0,0,1,45.738-10a2.713,2.713,0,0,1,2.919,2.625Z" transform="translate(84 65)" fill="#2d3d43"/>
          <path d="M4.131,0H14.878a4.131,4.131,0,0,1,4.131,4.131v.2a3.934,3.934,0,0,1-3.934,3.934H4.131A4.131,4.131,0,0,1,0,4.131v0A4.131,4.131,0,0,1,4.131,0Z" transform="matrix(0.966, -0.259, 0.259, 0.966, 43.857, 47.174)" fill="#41b883"/>
          <rect width="21.367" height="8.262" rx="4.131" transform="matrix(0.966, -0.259, 0.259, 0.966, 52.56, 55.828)" fill="#41b883" opacity="0.7"/>
          <rect width="20.771" height="8.262" rx="4.131" transform="matrix(0.966, -0.259, 0.259, 0.966, 46.188, 68.26)" fill="#41b883" opacity="0.4"/>
          <g transform="translate(142 48)" fill="none" stroke="#41b883" stroke-width="1">
            <rect width="40" height="21" rx="6" stroke="none"/>
            <rect x="0.5" y="0.5" width="39" height="20" rx="5.5" fill="none"/>
          </g>
        </g>
      </svg>

      <!-- <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span> -->
    </router-link>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <NavLinks class="can-hide"/>
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">

.navbar
  display flex
  align-items center
  justify-content space-between
  padding 0 2rem
  line-height $navbarHeight - 1.4rem

  a, span, img, .dropdown .btn 
    padding: 1rem
  .home-link
    display block
    height: 34px;
    padding 0
    svg
      height 34px
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left .5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    display flex
    align-items center
  .search-box
    margin-right: 0
    input 
      width: 20px;
      border: 1px solid transparent;
      background-color transparent
      transition width ease 200ms
      &.focused
        border: 1px solid var(--color-primary)
        background-color #fff
        width 12.5rem
        position fixed
        top: 10px
        left: 11rem;
        right: 0;

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
