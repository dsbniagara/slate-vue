<template>
<div class="date-range-picker" :class="{inline:inline}">
    
    <div v-if="!inline" tabindex="5" class="display"  @click="show()">
        <div class="range-display"><em>{{display.from}}</em> - <em>{{display.to}}</em></div>
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24">
            <g opacity="0.568">
                <path d="M22.9,1H18a1,1,0,0,0-2,0H8A.945.945,0,0,0,7,0,.945.945,0,0,0,6,1H1.1A1.11,1.11,0,0,0,0,2.1V22.9A1.11,1.11,0,0,0,1.1,24H22.9A1.11,1.11,0,0,0,24,22.9V2.1A1.11,1.11,0,0,0,22.9,1ZM22,22H2V8H22ZM22,7H2V3H6V4A.945.945,0,0,0,7,5,.945.945,0,0,0,8,4V3h8V4a1,1,0,0,0,2,0V3h4Z" fill="#707070"/>
            </g>
        </svg>
    </div>
    <div class="date-range-picker-selector" v-if="inline||shown">
        <div class="date-pickers">
            <div class="multi-date-picker">
                <div v-for="(calendar,n) in calendars" :key='n' :class='`date-picker-${n} date-picker`'>
                    <date-picker 
                        v-model="calendar.selected" 
                        :open-date="calendar.openDate" 
                        :inline="true" 
                        :disabled-dates="calendar.disabledDates"
                        :highlighted="highlighted"
                        maximum-view="day" 
                        @selected="selectedDate" 
                        @changed-month="changedMonth($event,n)"></date-picker>
                </div>
            </div>
        </div>
        <div class="date-selections">
            <div class="range-selection">
                <input ref="fromInput" class="form-input" type="text" placeholder="From" :value="inputFrom" @blur="inputFrom=$event.target.value" />
                <div class="to">to</div>
                <input ref="toInput" class="form-input" type="text" placeholder="To" :value="inputTo" @blur="inputTo=$event.target.value"  />
            </div>
            <ul class="presets">
                <li><a @click="preset(1,'month')" tabindex="1">1 month</a></li>
                <li><a @click="preset(3,'month')" tabindex="1">3 months</a></li>
                <li><a @click="preset(6,'month')" tabindex="1">6 months</a></li>
                <li><a @click="preset(1,'year')" tabindex="1">1 year</a></li>
            </ul>
            <div class="actions" v-if="!inline">
                <button tabindex="2" class="button button__link" @click="cancel">Cancel</button>
                <button tabindex="2" class="button" @click="apply">Apply</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import DatePicker from '../DatePicker/DatePicker.vue';
const moment = require('moment');
export default {
    components: {
        DatePicker
    },
    props: {
        inline: Boolean,
        data: Object,
        from: Date,
        to: Date,
        datePickers: {
            type: Number,
            default: 3
        },
        inputFormat: {
            type: String,
            default: "D MMM YYYY"
        },
        displYFormat: {
            type: String,
            default: "D MMM YY"
        },
    },
    data() {
        return {
            calendars: [],
            selectStart: true,
            selectingFrom: null,
            selectingTo: null,
            range: {
                from: null,
                to: null
            },
            pending: {
                from: null,
                to: null
            },
            shown: false
        }
    },
    mounted() {
        this.range.from = this.from ? moment.utc(this.from).toDate() : new Date();
        this.range.to = this.to ? moment.utc(this.to).toDate() : new Date();
        this.pending.from = this.from ? moment.utc(this.from).toDate() : new Date();
        this.pending.to = this.to ? moment.utc(this.to).toDate() : new Date();

        for(var i = this.datePickers; i > 0; i-- ) {
            this.calendars.push({
                selected: null,
                // disabledDates: {
                //     from: new Date(),
                // },
                openDate: new Date(new Date().setMonth( new Date().getMonth()-i+1 ))
            });
        }

    },
    computed: {
        display() {
            return {
                from: moment(this.range.from).utc().format(this.displayFormat),
                to: moment(this.range.to).utc().format(this.displayFormat)
            }
        },
        inputFrom: {
            get() { return moment(this.range.from).utc().format(this.inputFormat) },
            set(v) { 
                var date = moment(v);
                if( date.isValid() ) { this.range.from = moment.utc(v).toDate() }
            }
        },
        inputTo: {
            get() { return moment(this.range.to).utc().format(this.inputFormat) },
            set(v) { 
                var date = moment(v);
                if( date.isValid() ) { this.range.to = moment.utc(v).toDate() }
            }
        },
        highlighted() {
            return {
                from: new Date(this.range.from),
                to: new Date(this.range.to)
            }
        }
    },
    methods: {
        focusTo() {
            this.$refs.toInput.focus();
        },
        focusFrom() {
            this.$refs.fromInput.focus();
        },
        preset( cnt, unit ) {
            this.range.from = moment().subtract(cnt,unit).utc().toDate();
            this.range.to = moment().utc().toDate();
            this.$refs.multiPicker.changedMonth( this.range.from,0 );
        },
        apply() {
            this.range = this.pending;
            this.$emit('update:from',this.range.from);
            this.$emit('update:to',this.range.to);
            this.$emit('input', this.range);
            this.shown = false;
        },
        show() {
            setTimeout(()=>{
                this.focusFrom();
            },100);
            this.shown = true;
        },
        cancel() {
            this.shown = false;
        },
        selectedDate(date,n) {
            this.calendars.map(c=>c.selected=null);
            if( this.selectStart ) {
                this.selectingFrom = date;
                this.selectingTo = null;
                this.selectStart = false;
                this.$emit('selecting-to');
            } else {
                this.selectingTo = date;
                this.selectStart = true;
                this.$emit('selecting-from');
            }
            if( this.selectingFrom && this.selectingTo ) {
                this.start = this.selectingFrom;
                this.end = this.selectingTo;
                this.range = { from: this.start, to: this.end };
                this.$emit('input', this.range);
            }
            this.updateSelection();
            return false;
        },
        changedMonth(date,n) {
            console.log(`📅 range changedMonth`,date,n)
            var d = moment(date);   
            for(var i = 0; i < this.calendars.length; i++ ) {
                this.calendars[i].openDate = moment(date).add('month', i-n).toDate();
            }
        },
        updateSelection() {
            console.log(`📅 range updateSelection`,this.range.from)
            this.calendars.forEach(c=> {
                c.openDate = c.openDate;
                c.selected = null;
                console.log(`📅 range `,c)
            });
        }
    }
}
</script>
<style lang="scss">
.date-range-picker {
    @media (min-width: 960px ) {
        position: relative;
    }
    &.inline {        
        width: 100%;
    }
    .display {
        display: flex;
        height: 3em;
        align-items: center;
        color: #3d4e61c5;
        background: #fff;
        padding: .3em 1em;
        border-radius: 2em;
        transition: ease all .4s;
        border-radius: $radius;
        white-space: nowrap;    
        border: 1px solid #f3f3f3;
        
        .icon {
            width: 18px;
            margin: 0;
        }
        &:hover {
            box-shadow: $shadow-over;
            // background: rgba($color-dark,.02);
        }
        &:focus,&:active {
            box-shadow: $shadow-active;
            outline: none;
            background: #fff;
        }
        em {
            font-weight: 600;
            color: #4e4e4c;
            font-style: normal;
            margin: 0 4px;
        }
    }
    .date-range-picker-selector {  
        box-shadow: $shadow-up;
        border: 0 none;
        border-radius: 5px;
        background: #fff;
        
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 20px;
        right: 20px;
        z-index: 99;
        margin-top: 10px;

        @media (min-width: 960px ) {
            max-width: 1100px;
            min-width: 900px;
            z-index: 100;
            right: 0;
            left: auto;
            top: 50px;
            flex-direction: row;
        }
    }
    &.inline .date-range-picker-selector {
        position: relative;
        top: auto;
        right: auto;
        margin-top: 0;
        max-width: 100%;
    }
    .date-selections {
        padding: 20px 20px 60px 20px;
        border-radius: 5px;
        @media (min-width: 960px ) {
            width: 60%;
        }
        .presets {
            list-style: none;
            margin: 0;
            padding: 16px 0;
            display: flex;
            justify-content: space-around;
            @media (min-width: 960px ) {
                display: block;
            }
            a {
                font-weight: 500;
                margin: 8px 0;
                display: block;
                &:focus {
                    outline: none;
                }
            }
        }
        .range-selection {
            display: flex;
            align-items: center;
            @media (min-width: 960px ) {
                display: block;
            }
            .to {
                text-align: center;
                font-size: .9em;
                margin: 6px;
            }
            input { 
                text-align: center;
                font-size: .9em;
                margin: 0;
            }
        }
        .actions {
            position: absolute;
            bottom: 16px;
            right: 16px;
        }
    }
}
.multi-date-picker {
    width: 100%;
    display: flex;
    padding: 1em;
    @media (min-width: 960px ) {
        padding: 0em;
    }
    .date-picker {
        padding: 0em;
        @media (min-width: 960px ) {
            padding: 1em;
        }
    }
    .calendar.vdp-datepicker__calendar {
        max-width: none;
        box-shadow: none;
        padding: 0;
        background: transparent;
        min-width: 0;
        .day__month_btn {
            border-radius: 34px;
            height: 34px;
            line-height: 30px;
        }
        .cell {
            font-size: .9em;
            padding: 0 2px;
        }
    }
    .next.disabled {
        opacity: .3;
    }
    .date-picker .prev, .date-picker .next {
        visibility: hidden;
    }
    .date-picker:first-child .prev,
    .date-picker:last-child .next {
        visibility: visible;
    }
}

</style>