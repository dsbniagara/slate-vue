<template>
  <vuejsDatepicker 
    input-class="form-input" 
    :calendar-class="`calendar datepicker ${inline?'inline':''}`"
    format='MMM dd, yyyy'
    :value='value'
    :inline='inline'
    :open-date='openDate'
    :highlighted='highlighted' 
    :disabled-dates='disabledDates'
    :maximum-view='maximumView' 
    :placeholder='placeholder'
    @selected='selectDate'
    @changedMonth="changedMonth">
  </vuejsDatepicker>
</template>

<script>
import vuejsDatepicker from 'vuejs-datepicker';

export default {
  components: {
    vuejsDatepicker
  },
  props: {
    value: String,
    selected: Date,
    inline: Boolean,
    openDate: Date,
    highlighted: Object,
    disabledDates: Object,
    maximumView: String,
    placeholder: String,
  },
  data() {
    return {
      start: null,
      end: null,
      selectStart: true
    }
  },
  methods: {
    changedMonth(date) {
      this.$emit('changed-month',date);
    },
    selectDate(date) {
      this.$emit('input',date)
      this.$emit('selected',date)
    }
  }
}
</script>

<style lang="postcss">
.calendar.vdp-datepicker__calendar {
  width: 100%;
  border-radius: 4px;
  border: 0;
  padding: 1em;
  min-width: 300px;
  max-width: 400px;

  .next,.prev,.up {
      border-radius: 34px;
      height: 34px;
      line-height: 30px;
      border: 2px solid transparent;
      font-weight: normal;
      &:hover {
        color: var(--color-primary);
        opacity: 1;
      }
  }
  header {
      .next {
          &:after {
            border: 0 none !important;
            border-right: 3px solid #d2d5de !important;
            border-bottom: 3px solid #d2d5de !important;
            width: 10px;
            height: 10px;
            margin-top: -7px;
            top: 50%;
            right: 9px;
            left: auto;
            bottom: auto;
            position: absolute;
            transform: rotate(-45deg);
          }
          &:hover {
              &:after {
                border-right: 3px solid var(--color-primary) !important;
                border-bottom: 3px solid var(--color-primary) !important;
              }
          }
      }
      .prev {
          &:after {
            border: 0 none !important;
            border-left: 3px solid #d2d5de !important;
            border-bottom: 3px solid #d2d5de !important;
            width: 10px;
            height: 10px;
            margin-top: -7px;
            top: 50%;
            left: 12px;
            bottom: auto;
            position: absolute;
            transform: rotate(45deg);
          }
          &:hover {
              &:after {
                border-left: 3px solid var(--color-primary) !important;
                border-bottom: 3px solid var(--color-primary) !important;
              }
          }
      }
      .next:not(.disabled):hover, 
      .prev:not(.disabled):hover, 
      .up:not(.disabled):hover {
          background: transparent;
      }
      span {
          font-size: 1em;
          font-weight: 600;
      }
  }
  .cell {
    border: 0 none;
    padding: 0;
    border-radius: 40px;
    height: 40px;
    line-height: 40px;
    position: relative;
    z-index: 1;
    color: var(--color-text);

    &.disabled {
      opacity: .4;
    }

    &.day-header {
        text-transform: uppercase;
        padding: 0;
        height: 40px;
        line-height: 40px;
        font-size: 0.9em;
        opacity: 0.43;
    }

    &.today {
      color: #fff;
      &:after {
        top: 0;
        left: 0;
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--color-accent);
        z-index: -1;
        border-radius: 40px;
      }
    }

    &:not(.blank):not(.disabled).day:hover,
    &:not(.blank):not(.disabled).month:hover,
    &:not(.blank):not(.disabled).year:hover {
      border: 0 none !important;
      color: #fff;
      &:after {
        top: 0;
        left: 0;
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--color-primary-a-50);
        z-index: -1;
        border-radius: 40px;
      }
    }
    &:not(.blank):not(.disabled).highlighted:hover {
      background:var(--color-primary-a-30);
    }
    &.selected {
      color: #fff;
      background: transparent;
      &.highlighted {
        background: var(--color-primary);
        &.highlight-start.highlight-end {
          background: transparent;
        }
      }
      &:after {
        top: 0;
        left: 0;
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--color-primary);
        z-index: -1;
        border-radius: 40px;
      }
    }
    &.highlighted {
      border-radius: 0;
      color: #fff;
      background:var(--color-primary-a-30);
      &:hover {
        background: transparent;
      }
      &:after {
        top: 0;
        left: 0;
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
      }
      &.highlight-start {
        border-radius: 40px 0 0 40px;
        &:after {
          border-radius: 40px;
          background: var(--color-primary);
        }
      }
      &.highlight-end {
        border-radius: 0 40px 40px 0;
        background:var(--color-primary-a-30);
        &:after {
          border-radius: 40px;
          background: var(--color-primary);
        }
      }

      &.highlight-start.highlight-end {
        background: transparent;
      }
    }
  }  
}
</style>