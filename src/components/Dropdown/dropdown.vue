<template>
    <div class="dropdown" :class="{position,'dropdown--visible':visible}">
        <button class="btn" :class="classs" ref="button" type="button" @click.stop.prevent="toggle()">
            {{text}}<slot name="button"></slot>
        </button>
        <div ref="dropdown-list" class="dropdown-list" :class="{visible:visible}">
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
            visible: false
        }
    },
    created() {
        document.addEventListener("click",() => {
            if(this.visible) {
                this.hide();
            }
        });
    },
    computed: {
        classs() {
            if( this.variant == '' ) return '';
            if( !this.variant) return 'btn btn--primary';
            return 'btn bzn--'+this.variant;
        }
    },
    methods: {
        show() {
            this.visible = true;
            this.$emit('show');
        },
        hide() {
            this.visible = false;
            this.$emit('hidden');
        },
        toggle(){
            this.visible=!this.visible;
            this.$emit(this.visible?'show':'hidden');
        }
    }
}
</script>