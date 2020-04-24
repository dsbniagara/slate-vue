<template>
    <div class="code-input">
      <input ref="input1" v-model="value1" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(1, $event)" @keypress="keyPress(1, $event)" @paste="paste(1, $event)" />
      <input ref="input2" v-model="value2" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(2, $event)" @keypress="keyPress(2, $event)" @paste="paste(2, $event)" />
      <input ref="input3" v-model="value3" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(3, $event)" @keypress="keyPress(3, $event)" @paste="paste(3, $event)" />
      <span>-</span>
      <input ref="input4" v-model="value4" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(4, $event)" @keypress="keyPress(4, $event)" @paste="paste(4, $event)" />
      <input ref="input5" v-model="value5" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(5, $event)" @keypress="keyPress(5, $event)" @paste="paste(5, $event)" />
      <input ref="input6" v-model="value6" class="form-input" placeholder="X" type="text" maxlength="1" @keyup="keyUp(6, $event)" @keypress="keyPress(6, $event)" @paste="paste(6, $event)" />
    </div>
</template>
<script> 
export default {
    props: ['value'],
    data() {
        return {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
        }
    },
    computed: {
    },
    methods: {
        formatCode() {
            var code = `${this.value1}${this.value2}${this.value3}-${this.value4}${this.value5}${this.value6}`;
            return code;
        },
        keyUp( num, e ) {
            let code = this.formatCode();
            if(code.length==7) this.$emit('input', code);
        },
        keyPress( num, e ) {
            if( e.key.length == 1) {
                this[`value${num}`] = e.key.toUpperCase();
                // e.target.value = e.key.toUpperCase();
                if(this.$refs[`input${num+1}`]) this.$refs[`input${num+1}`].focus();
            }
        },
        paste( num, e ) {
            var text = e.clipboardData.getData('text');
            var code = text.substring(0,10).trim().replace('-', '' ).toUpperCase();
            for( var i = 0; i < 6; i++ ) {
                this[`value${i+1}`] = code[i];
            }

            this.$emit('input', this.formatCode());
        }
    }
}  
</script>
<style lang="scss">
.code-input {
    display: flex;
    align-items: center;
    margin-left: -4px;
    margin-right: -4px;
    span {
        font-weight: bold;
        font-size: 1.5em;
        opacity: .2;
        display: block;
        padding: 16px 4px;
    }
    input {
        text-align: center;
        font-weight: bold;
        font-size: 1.5em;
        margin: 0 4px;
        padding: 16px 4px;
    }
    &.dark {
        span {
            color: #fff;
            opacity: .3;
        }
        input {
            background: transparent;
            color: #fff;
            border: 1px solid #8a8a8a;
            &::placeholder {
                color: #8a8a8a;
            }
            &:focus {
                border: 1px solid var(--color-primary);
            }
        }
    }
}
.code-input.dark {
    span {
        color: #fff;
        opacity: .3;
    }
    input {
        background: transparent;
        color: #fff;
        border: 1px solid #8a8a8a;
        &::placeholder {
            color: #8a8a8a;
        }
        &:focus {
            border: 1px solid var(--color-primary);
        }
    }
}
</style>
