<template>
<div class="avatar" :title="name" :class='{round:round}'>
    <abbr>{{ancronym}}</abbr>
    <img ref="img" :class="{'loaded':imageValid}" @load="imageLoaded" @error="loadFallback" :src="src" alt="Avatar" />
</div>
</template>
<script>
export default {
    name: 'avatar',
    props: {
        'email': {
            default: null,
            type: String
        },
        'username': {
            default: null,
            type: String
        },
        'uid': {
            default: null,
            type: String
        },
        'name': {
            default: 'NA',
            type: String
        },
        'fallback': {
            default: 'acronym',
            type: String
        },
        'round': {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            src: '',
            imageValid: false,
            imageFailed: false,
        }
    },
    watch: {
        email() {
            console.log('avatar email update');
            this.mount();
        },
        username() {
            console.log('avatar username update');
            this.mount();
        },
        uid() {
            console.log('avatar uid update');
            this.mount();
        }
    },
    mounted() {
        this.mount();
    },
    computed: {
        photoKey() {
            return this.email ? this.email : ( this.username ? this.username : ( this.uid ? this.uid : false ) )
        },
        ancronym() {
            if( this.name != '' && this.name.indexOf(' ') > -1 ) {
                let s = this.name.split(' ');
                return `${s[0][0]}${s[1][0]}`;
            }
            return this.name;
        }
    },
    methods: {
        mount() {
            this.src = this.photoKey ? 'https://api.dsbn.org/avatar/v1/' + this.photoKey + '/photo' : false;
            if( this.src === false && this.fallback != 'acronym' ) {
                this.src = this.fallback;
            }
        },
        imageLoaded() {
            this.imageValid = this.$refs.img.complete,this.$refs.img.naturalHeight;
        },
        loadFallback() {
            this.imageFailed = true;
            this.src = this.fallback;
        }
    }
}
</script>
<style lang="scss">
.avatar {
    width: 42px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: var(--color-primary);
    position: relative;

    &.round {
        border-radius: 100%;
        img {
            border-radius: 100%;
        }
        
    }

    abbr {
        display: block;
        border-radius: 100%;
    }
    img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: ease all .2s;
        &.loaded {
            opacity: 1;
        }
    }
}
</style>