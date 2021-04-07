<template>
    <div class="dropdown" :class="classes" @mouseleave="mouseleave">
        <button :class="classesBtn" ref="button" type="button" @click="click" @mouseover="mouseover">
            <slot name="button">{{text}}</slot>
        </button>
        <div ref="list" class="dropdown-list">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        trigger: {
            type: String,
            default: 'click',
        },
        delay: {
            type: Number,
            default: 0,
        },
        text: {
            type: String,
            default: 'Dropdown',
        },
        btn: {
            type: String,
            default: '',
        },
        autoClose: {
            type: Boolean,
            default: true,
        },
        events: {
            type: Boolean,
            default: true,
        },
        position: {
            type: String,
            default: 'left',
        }
    },
    data() {
        return {
            focusIndex: -1,
            style: {},
            visible: false
        }
    },
    destroyed() {
        this.removeEvents();
    },
    computed: {
        classes() {
            let classes = []
            if( this.visible ) classes.push('dropdown--visible')
            if( this.position == 'right' ) classes.push('dropdown--right')
            if( this.position == 'center' ) classes.push('dropdown--center')
            return classes.join(' ')
        },
        classesBtn() {
            if( this.btn && this.btn != '' ) return 'btn btn--'+this.btn;
            return 'btn';
        }
    },
    methods: {
        click() {
            this.toggle();
        },
        mouseover() {
            if( this.trigger == 'hover' ) {
                var delay = parseInt(this.delay);
                this.over = true;
                setTimeout(_=>{
                    if( this.over ) this.show()
                },delay);
            }
        },
        mouseleave() {
            if( this.trigger == 'hover' ) {
                this.over = false;
                this.hide();
            }
        },
        closeOutside(e) {
            if (!this.$el.contains(e.target)){
                this.hide();
            }
        },
        show(e) {
            this.focusIndex = -1;
            this.visible = true;
            this.addEvents();
            this.$emit('show',this.$el);
        },
        hide(e) {
            this.removeEvents();
            this.visible = false;
            this.$emit('hide',this.$el);
        },
        toggle(e){
            if( this.visible ) this.hide(e);
            else this.show(e);
        },
        keyDown(e) {
            if( !this.visible ) return;
            e = e || window.event;
            if (e.keyCode == 38) this.arrowUp(e);
            else if (e.keyCode == 40) this.arrowDown(e);
            else if (e.keyCode == 9) this.tab(e);
            else if (e.keyCode == 13) this.enter(e);
            else if (e.keyCode == 27) this.esc(e);
        },
        arrowDown(e) {
            var children = this.$refs.list.children;
            if( children && children[this.focusIndex+1] ) {
                children[++this.focusIndex].focus();
            }
            e.preventDefault();
        },
        arrowUp(e) {
            var children = this.$refs.list.children;
            if( children && children[this.focusIndex-1] ) {
                children[--this.focusIndex].focus();
            }
            e.preventDefault();
        },
        tab(e) {
            console.log('tab', this.$refs.list.children)
        },
        enter(e) {
            var children = this.$refs.list.children;
            if( children && children[this.focusIndex] ) {
                children[this.focusIndex].click();
                e.preventDefault();
                this.hide();
            }
        },
        esc(e) {
            this.hide(e);
        },
        addEvents(){
            if( this.events ) {
                window.addEventListener('click', this.closeOutside);
                window.addEventListener('keydown', this.keyDown);
            }
        },
        removeEvents(){
            if( this.events ) {
                window.removeEventListener('click', this.closeOutside);
                window.removeEventListener('keydown', this.keyDown);
            }
        }
    }
}
</script>

<style lang="scss">
</style>
