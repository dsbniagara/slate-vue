<template>
<div class="notifications" v-if="active.length>0">
    <div class="notification" :class='styles(n)' v-for="(n,idx) in active" :key="idx" @click="remove(n)">
        <div class="title" v-if="n.title">{{n.title}}</div>
        <div class="text" v-if="n.text">{{n.text}}</div>
        <div class="notification-actions">
            <a v-for="(action,ax) in n.actions" :key="ax" class="action" @click.stop="perform(action,n)">
                {{ax}}
            </a>
        </div>
        <a v-if="n.closeable" class="close">
            <svg viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
        </a>
    </div>
</div>
</template>
<script>
export default {  
    data() {
        return {
            list: [],
            defaults: {
                duration: 7000,
                type: 'info',
                dismissed: false,
                closeable: true
            }
        }
    },
    computed: {
        active() {
            return this.list.filter(n=>n.dismissed!==true);
        }
    },
    mounted () {
        this.$notifySetInstance(this);
    },
    methods: {
        add(notify) {
            var n = Object.assign({}, this.defaults, notify );
            // set id
            if( n.duration && n.duration > 0 ) {
                setTimeout(() => {
                    this.remove(n)
                }, n.duration);
            }
            if( n.id ) {
                var index = this.list.findIndex( _ => _.id == n.id );
                this.list.splice(index,1,n);
            } else {
                n.id = Date.now();
                this.list.push(n);
            }
            n.update = (replace) => {
                if (typeof replace === 'string') {
                    replace = { title: '', text: replace }
                }
                replace.id = n.id;
                return this.add(replace);
            };
            return n;
        },
        remove(n) {
            n.dismissed = true;
        },
        styles(n) {
            return `notification-${n.type}` + (n.dismiss ? ' dismiss' : '');
        },
        perform(action, n){
            action(n);
        }
    }
}
</script>
<style lang="scss">
.notifications {
    position: fixed;
    padding: 0;
    z-index: 999;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    .notification {
        margin-top: 12px;
        animation: splash .4s normal forwards ease-in-out;
        padding: 1.6rem 1.9rem;
        min-width: 300px;
        max-width: 300px;
        background: rgba(0,0,0,.9);
        color: #fff;
        box-shadow: 0px 2px 0px 1px rgba(0, 0, 0, 0.05), 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .notification-actions {
            margin-right: 1.6rem;
            .action {
                float: right;
                color: #c9c946;
                font-weight: bold;
                margin-left: 6px;
                &:hover {
                    color: #c9c946;
                }
            }
        }
        .close {
            padding: 1.6em;
            top: 0;
            right: 0;
            position: absolute;
            > svg {
                width: 15px;
                height: 15px;
                path {
                    fill: rgba(255,255,255,.7);
                    transition: ease all .4s;
                }
            }
            &:hover {
                > svg {
                    path {
                        fill: rgba(255,255,255,.9);
                    }
                }
            }
        }

        .title {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 1.1em;
        }

        &-success {
            background: var(--color-success);
        }
        &-error {
            background: var(--color-error);
        }
        &-warning {
            background: var(--color-warning);
        }
        &.dismiss {
            opacity: 0;
            animation: out .4s normal forwards ease-in-out;
        }
    }
}
@keyframes splash {
    from {
        opacity: 0;
        transform: scale(.9, .9);
    }
    to {
        opacity: 1;
        transform: scale(1, 1);
    }
}
@keyframes out {
    from {
        opacity: 1;
        transform: scale(1,1);
    }
    to {
        opacity: 0;
        transform: translateY(-5px);
    }
}
</style>