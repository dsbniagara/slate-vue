<template>
  <div class="time-input">
    <input 
      ref="time-input"
      class="form-input" type="text" 
      @focus='focus'
      @keydown.prevent='keydown'
      :value='value'
      :placeholder='placeholder' />
    <div ref="suggestions" v-if="showSuggestions" class="suggestions">
      <a v-for="(time,k) in autoCompleteTimes" :key="k" @click="setTime(time)" :class="{'selected':value==time}">{{time}}</a>
    </div>
  </div>
</template>
<style lang="postcss">
.time-input {
  position: relative;
}
.time-input .suggestions {
  border: 1px solid #d4d4d4;
  max-height: 200px;
  overflow: auto;
  position: absolute;
  z-index: 99;
  width: 100%;
  background: #fff;
  padding: .5em 0;
  box-shadow: var(--shadow-up);
  border-radius: var(--border-radius);
}
.time-input .suggestions a {
  display: block;
  padding: 8px 20px;
  cursor: default;
  color: var(--color-dark);
  &.selected,&:hover {
    color: #fff;
    background-color: var(--color-primary);
  }
}
</style>
<script>
export default {
  props: {
    value: String,
    placeholder: String,
    interval: {
      type: Number,
      default: 30 
    },
    twentyFourHour: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: '',
      timeValid: false,
      showSuggestions: false
    }
  },
  computed: {
    autoCompleteTimes() {
      if( this.interval == 0 ) this.interval = 30;
      var times = 24*60/this.interval;
      var l = [];
      for(let i = 0; i <=times - 1;i++ ) {
        var h = Math.floor( (i*this.interval)/60 );
        var m = (i*this.interval) % 60;
        m = String(m).length == 1 ? "0" + m : m;
        var pm = ( h >= 12 );
        if(!this.twentyFourHour && h > 12) {
          h -= 12;
        }
        if( h == 0 ) h = 12;
        var o = `${h}:${m}`;
        if(!this.twentyFourHour) {
          o = o + ` ${pm?'PM':'AM'}`;
        }
        l.push(o);
      }
      return l;
    }
  },
  mounted() {
    if( this.value ) {
      this.time = this.value;
      this.validateTime( this.time );
    }
    document.addEventListener('click',this.clickOutside);
    // document.addEventListener('keydown',this.keyDown);
    document.addEventListener('touchstart',this.clickOutside);
  },
  destroyed(){
    document.removeEventListener('click',this.clickOutside);
    // document.removeEventListener('keydown',this.keyDown);
    document.removeEventListener('touchstart',this.clickOutside);
  },
  methods: {
    keyDown(event){
      if( event.key == "Tab"||event.key=="Enter") {
        this.showSuggestions = false;
        this.validateTime(this.$refs['time-input'].value);
        this.$refs['time-input'].blur();
      } else if( event.key =='ArrowUp') {
        var suggestions = Array.from(this.$refs.suggestions.children);
        var index = suggestions.findIndex(c=>c.innerText==this.value);  
        this.setTime(suggestions[( index > -1 && index-1 >= 0 ) ? index-1 : suggestions.length-1 ].innerText, false); 
      } else if( event.key =='ArrowDown') {
        var suggestions = Array.from(this.$refs.suggestions.children);
        var index = suggestions.findIndex(c=>c.innerText==this.value);  
        this.setTime(suggestions[( index > -1 && index+1 <= suggestions.length-1 ) ? index+1 : 0 ].innerText, false);
      }
    },
    clickOutside(event) {
      if(!this.$el.contains(event.target)) {
        this.showSuggestions = false;
        this.validateTime(this.$refs['time-input'].value);
      }
    },
    focus(event) {
      this.showSuggetions();
      event.target.select();
    },
    scrollSuggestionsToValue() {
      var offset = 0;
      Array.from(this.$refs.suggestions.children).forEach(child=>{
        var pos = child.getBoundingClientRect();
        if( child.innerText == this.value ) {
          this.$refs.suggestions.scrollTop = offset;
        }
        offset+= pos.height;
      });
    },
    showSuggetions(){
      this.showSuggestions = true;
      if( this.value ) {
        this.$nextTick(()=>{
          this.scrollSuggestionsToValue();
        });
      }
    },
    setTime(time,closeSuggestions) {
      console.log('settime',time);
      this.time = time;
      this.$emit('input', this.time);
      if( closeSuggestions !== false ) {
        this.$nextTick(()=>{
          this.showSuggestions = false;
        });
      } else {
        this.$nextTick(()=>{
          this.scrollSuggestionsToValue();
        });
      }
    },
    validateTime(time) {
        var re = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):?([0-9]|[0-5][0-9])?([ ]?[a|p]m)?$', 'g');
        var parts = re.exec( time.toLowerCase() );
        if( parts ) {
            var hour = parseInt(parts[1]);
            var min = parseInt(parts[2]);
            var amPm = parts[3];
            if( isNaN(hour) ) hour = 1;
            if( isNaN(min) ) min = 0;
            if( min>60 ) min = 0;
            if( amPm == undefined ) {
                amPm = 'AM';
            } else {
                amPm = amPm.trim().toUpperCase();
            }
            if( hour>12 ) {
              hour -= 12;
              amPm = 'PM';
            }
            this.time = hour + ':' + ( min < 10 ? '0' : '' ) + min + ' ' + amPm;
            this.timeValid = true;

            this.$emit('input', this.time);
        } else {
            this.timeValid = false;
            this.$emit('input', '');
        }
        return this.timeValid;
    }
  }
}
</script>