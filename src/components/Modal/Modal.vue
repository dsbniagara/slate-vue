<template>
    <div class="modal-backdrop" :class="{show:shouldShow}" @click.self="onClose">
        <div ref="modal" class="modal">
            <button class="close" type="button" @click="hide()"><svg height="16" id="svg2" version="1.1" width="16"><defs id="defs4"/><g transform="translate(0,-1036.3622)"><path d="m 2,1050.3622 12,-12" id="path2985"  class="stroke" style="fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/><path class="stroke" d="m 2,1038.3622 12,12" style="fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/></g></svg></button>
            <header v-if="hasHeader">
                <slot name="header"></slot>
            </header>
            <div class="content"><slot></slot></div>
            <footer v-if="hasFooter">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shouldShow: false
        }
    },
    computed: {
        hasHeader () {
            return !!this.$slots['header']
        },
        hasFooter () {
            return !!this.$slots['footer']
        }
    },
    methods: {
        show() {
            this.shouldShow = true;
            this.$emit('open');
        },
        hide() {
            this.shouldShow = false;
            this.$emit('close');
        },
        toggle() {
            if( this.shouldShow ) return this.hide();
            return this.show();
        },
        dontClose(e){
            return false;
        },
        onClose() {
            this.shouldShow = false;
        }
    }
}
</script>

<style>

</style>

<style lang="postcss">

.modal-backdrop {
    opacity: 0;
    position: fixed;
    overflow: auto;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: left;
    background: rgba(0,0,0,.7);
    transition: opacity .25s ease;
    z-index: 999;
    .modal {
        transform: scale(.9);
        transition: transform .25s ease;
        position: absolute;
        margin: auto;
        background: #fff;
        border-radius: 5px;
        box-shadow: var(--shadow-up);
        left: 20px;
        right: 20px;
        top: 20px;
        margin-bottom: 20px;
    
        @media(--large-viewport) {
            top: 8%;
            width: 50%;
            min-width: 800px;
            max-width: 100%;
            bottom: auto;
        }

        .close {
            position: absolute;
            top: 1em;
            right: 1em;
            border: 0 none;
            background: transparent;
            padding: 16px;
            .stroke {
                stroke: rgba(0,0,0,0.4);
            }
            &:hover {
                opacity: 1;
                .stroke {
                    stroke: var(--color-primary);
                }
            }
        }
        
        > header {
            display: flex;
            align-items: center;
            padding: 2em 3em;
            .title {
                font-size: 1.2em;
            }
        }
        > .content {
            padding: 3em;
            min-height: 100px;
        }
        > .content .actions {
            display: flex;
            justify-content: flex-end;
        }
        > footer {
            padding: 2em 3em;
        }
    }
    &.show {
        opacity: 1;
        pointer-events: auto;
        .modal {
            transform: scale(1);
        }
    }
}
</style>
