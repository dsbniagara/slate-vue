<template>
<aside class="sidebar" :class="{condensed:condense, 'with-secondary':hasInception, 'dark':dark}">
    <header>
        <slot name="header"></slot>
    </header>
    <slot></slot>
    <footer>
        <slot name="footer">
        </slot>
        <a v-if="showCondenser" class="condenser" @click="condenseSidebar()">
            <svg class="icon" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
        </a>
    </footer>
</aside>
</template>

<script>
export default {
    name: 'sidebar',
    props: {
        'condensed': {
            default: false,
            type: Boolean
        },
        'show-condenser': {
            default: false,
            type: Boolean
        },
        'dark': {
            default: true,
            type: Boolean
        },
        'id': {
            default: '',
            type: String
        },
        'secondary': {
            default: false,
            type: Boolean
        }
    },
    computed: {
        hasInception () {
            return ( this.subSidebar );
        },
        subSidebar () {
            if( !this.$slots.default ) return null;
            var c = this.$slots.default.find(n=>{
                return n.componentOptions&&n.componentOptions.tag&&n.componentOptions.tag=='sidebar' ? n : false;
            });
            return c;
        }
    },
    data() {
        return {
            condense: false
        }
    },
    mounted() {
        if( this.condensed ) {
            this.condense = true;
        }
        let c = localStorage.getItem('sidebar-condense' + (this.id?'-'+this.id:''));
        this.condense = ( c == 'true' ) ? true : ( c == 'false' ? false : this.condense );
    },
    methods: {
        condenseSidebar() {
            this.condense = !this.condense
            localStorage.setItem('sidebar-condense' + (this.id?'-'+this.id:''), this.condense);
        }
    }
}
</script>
<style lang="scss">

$sidebar-width: 260px !default;
$sidebar-condensed-width: 120px !default;

$color-sidebar-accent: var(--color-primary) !default;

$color-sidebar-light-bg: #fff !default;
$color-sidebar-light-text:  var(--color-dark) !default;
$color-sidebar-light-text-active:  var(--color-dark) !default;
$color-sidebar-light-icon: var(--color-light) !default;
$color-sidebar-light-icon-active: var(--color-primary) !default;

$color-sidebar-dark-bg:  var(--color-dark) !default;
$color-sidebar-dark-text: #fff !default;
$color-sidebar-dark-text-active: #fff !default;
$color-sidebar-dark-icon: rgba(255, 255, 255, .65) !default;
$color-sidebar-dark-icon-active: var(--color-primary) !default;

.sidebar {
    z-index: 3;
    position: fixed;
    overflow: auto;
    top: 0;
    left: 0;
    height: 100%;
    padding: 0;
    background: $color-sidebar-light-bg;
    width: $sidebar-width;
    transition: ease all 500ms;
    color: #989ead;

    &.dark {
        background: $color-sidebar-dark-bg;
        .navbar-brand {
            color: $color-sidebar-dark-text;
            &:focus, &:active, &:hover {
                color: $color-sidebar-dark-text-active;
            }
        }
        .nav-item .nav-link {
            color: $color-sidebar-dark-text;
            &:hover,&.active {
                color: $color-sidebar-dark-text-active;
            }
        }
        svg .fill {
            fill: $color-sidebar-dark-icon;
        }
        a:hover svg.icon .fill {
            fill: $color-sidebar-dark-icon-active; 
        }
        .context-switch {
            box-shadow: 0 1px rgba(83, 102, 134, 0.4);
            .context-title {
                color: $color-sidebar-dark-text;
            }
        }
        footer {
            border-color: rgba(83, 102, 134, 0.4);
        }
        .user-options {
            .name {
                font-size: 1em;
                color: $color-sidebar-dark-text;
                margin-left: .8em;
            }
        }
        .vb > .vb-dragger > .vb-dragger-styler {
            background-color: var(--color-light);
        }
        .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
            background-color: var(--color-light);
        }
        .vb > .vb-dragger:hover > .vb-dragger-styler,
        .vb.vb-dragging > .vb-dragger > .vb-dragger-styler,
        .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
            background-color: var(--color-light);
        }
    }

    header {
        padding: 1em 2.1em;
    }
    .title {
        margin: 0;
        font-weight: bold;
        color: $color-sidebar-light-text;
        &:focus,
        &:active,
        &:hover {
            color: $color-sidebar-light-text-active;
        }
    }
    
    svg {
        .fill { fill: $color-sidebar-light-icon; transition: ease all .2s; }
    }
    .nav-item {
        text-align: center;
        .nav-link {
            display: flex;
            padding: .8em 1.1em;
            margin: 0 1em;
            align-items: center;
            color: $color-sidebar-light-text;
            &:hover,
            &.active,
            &.router-link-active {
                color: $color-sidebar-light-text-active;
                border-radius: 3px;
                margin: 0 1em;
                svg.icon {
                    .fill { fill: $color-sidebar-light-icon-active; }
                }
            }
            &.active {
                font-weight: bold;
            }
            .nav-link-icon {
                display: block;
                height: 24px;
                width: 24px;
                margin: 0 14px 0 -2px;
                transition: ease all 400ms;
                overflow: hidden;
            }
        }
        &>.nav {
            display: block;
            width: 100%;
            .nav-item {
                a {
                    padding: .3em 1.1em;
                    opacity: .67;
                    margin-left: 1em;
                    margin-left: 3.3em;
                    &.active {
                        opacity: 1;
                    }
                }
            }
        }
    }
    .sidebar {
        background: darken($color-sidebar-light-bg,2%);
        left: $sidebar-width;
    }
    footer {
        display: flex;
        justify-content:  space-between;
        align-items: center;
        margin: auto 1.8em 1em;
        padding-top: .6em;
        border-top: 1px solid rgba(83, 102, 134, 0.1);
    }
    .condenser {
        position: absolute;
        bottom: 5px;
        right: 5px;
        .icon {
            transition: ease all .4s;
        }
        &:hover {
            .icon {
                .solid {
                    fill: $color-sidebar-light-text;
                }
            }
        }
    }

    &.condensed {
        width: $sidebar-condensed-width;
        .condenser .icon {
            transform: rotate(-180deg);
        }
        .nav-item {
            .nav-link {
                margin: 0;
                font-size: 0.95em;
                padding: 1em 0.4em;
                display: block;
                text-align: center;
                .icon {
                    display: block;
                    height: 40px;
                    width: 40px;
                    margin: 0 auto;
                    svg {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
            &+.nav {
                .nav-item {
                    .nav-link {
                        margin: 0;
                        padding: 0;
                    }
                }
            }
        }
        .sidebar {
            left: $sidebar-condensed-width;
        }
        footer {
            justify-content: center;
        }
    }
    
    &+.main {
        margin-left: $sidebar-width;
        transition: ease all 500ms;
    }
    &.condensed+.main {
        margin-left: $sidebar-condensed-width;
        transition: ease all 500ms;
    }
    &.with-secondary+.main {
        margin-left: $sidebar-width*2;
    }
    &.condensed.with-secondary+.main {
        margin-left: $sidebar-condensed-width+$sidebar-width;
    }
}
</style>