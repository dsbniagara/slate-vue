<template>
<div class="number-input">
  <button ref="down" type="button" class="btn down">-</button>
  <input 
    class="form-input" 
    type="number" 
    :min="min_"
    :max="max_"
    :placeholder='placeholder'
    :value='value_'
    @input='set($event.target.value)' />
  <button ref="up" type="button" class="btn up">+</button>
</div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: {
      type: Number
    },
    max: String,
    min: String,
  },
  data() {
    return {
      value_: 0,
      min_: null,
      max_: null,
      timer: null,
      timeDown: null,
    }
  },
  mounted() {
    if( this.min ) this.min_ = parseInt(this.min);
    if( this.max ) this.max_ = parseInt(this.max);
    
    this.value_ = parseInt( this.value ? this.value : ( this.min_ ? this.min_ : 0 ) );

    window.addEventListener('mouseup', this.up);
    window.addEventListener('mousedown', this.down);
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.up);
    window.removeEventListener('mousedown', this.down);
  },
  methods: {
    set(v) {
      if( this.min_ && v < this.min_ ) {
        v = this.min_;
      }
      if( this.max_ && v > this.max_ ) {
        v = this.max_;
      }
      this.value_ = parseInt(v);
      this.$emit('input',this.value_);
    },
    down(e){
      var direction = e.target == this.$refs.down ? -1 : ( e.target == this.$refs.up ? 1 : null);
      if( direction ) {
        this.timeDown = Date.now();
        this.set(this.value_+(1*direction));
        setTimeout(this.warpSpeed(direction),10);
      }
    },
    up(e){
      this.timeDown = null;
      clearTimeout(this.timer);
    },
    warpSpeed(direction){
      clearTimeout(this.timer);
      var time = Date.now()-this.timeDown+1;
      var next = 70*Math.log(time*0.0001)*-1;
      this.timer = setTimeout(()=>{
        this.set(this.value_+(1*direction));
        this.warpSpeed(direction);
      },next);
    }
  }
}
</script>

<style lang="postcss">
.number-input {
    position: relative;
    .form-input {
        text-align: center;
        z-index: 2;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
    .up, .down {
        border: 1px solid transparent;
        box-shadow: none;
        position: absolute;
        top: 0;
        bottom: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        font-size: 1em;
        background: transparent;
        color: var(--color-dark);
        padding: 0 8px;
        text-align: center;
        display: flex;
        justify-content: center;
        &:hover {
            z-index: 3;
            color: var(--color-primary);
            background: #fdfdfd;
        }
        &:active,
        &:focus {
            z-index: 3;
            outline: none;
        }
    }
    .down {
        left: 0;
    }
    .up {
        right: 0;
    }
}
</style>