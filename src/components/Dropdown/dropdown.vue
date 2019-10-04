<template>
    <div class="dropdown" :class="position">
        <button class="btn" :class="classs" ref="button" type="button" @click.stop.prevent="show=!show">
            {{text}}<slot name="button"></slot>
        </button>
        <div ref="dropdown-list" class="dropdown-list" :class="{show:show}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'text',
        'position',
        'variant'
    ],
    data() {
        return {
            show: false
        }
    },
    created() {
        document.addEventListener("click",() => {
            if(this.show) this.show = false;
        });
    },
    computed: {
        classs() {
            if( !this.variant) return 'btn-primary';
            return 'btn-'+this.variant;
        }
    },
    methods: {
        onClose() {
            this.show = false;
        }
    }
}
</script>

<style>

</style>

<style lang="postcss">
.dropdown {
    display: inline-block;
    position: relative;
    &.right .dropdown-list {
        right: 0;
    }
    button {
        border-radius: 6px;
        display: inline-block;
        &:focus {
            outline: 0 none;
        }
    }
    .dropdown-list {
        min-width: 150px;
        text-align: left;
        position: absolute;
        display: none;
        background: #fff;
        box-shadow: var(--shadow-up);
        border-radius: var(--border-radius);
        padding: 8px 0;
        z-index: 999;
		width: 200px;
        margin-bottom: 30px;
        &.show {
            display: block;
        } 
        .dropdown-item {
			display: flex !important;
			align-items: flex-end;
            padding: 8px 20px;
            color: var(--color-dark);
            border-radius: 0;
            &:hover {
                color: #fff;
                background-color: var(--color-primary);
            }
		}
	}
}
</style>
