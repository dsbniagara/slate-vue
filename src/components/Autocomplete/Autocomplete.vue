
<template>
<div class="autocomplete">
    <div class="form-input" :class="{'focus':focused}" @click="click">
        <!-- <div class="autocomplete-selected-items" v-for="item in selected" :key="item">
            <slot name="selected" v-bind:selected="item">{{item}}</slot>
        </div> -->
        <input
            ref="input"
            type="text"
            v-model="inputText"
            :placeholder="inputPlaceholder"
            @input="change"
            @blur="blur"
            @focus="focus"
            @keydown.down.prevent="arrowDown"
            @keydown.up.prevent="arrowUp"
            @keydown.enter.prevent="enter"
        />
    </div>
    <ul v-show="isOpen" class="autocomplete-items">
        <li class="autocomplete-item loading" v-if="isLoading">
            Loading...
        </li>
        <li class="autocomplete-item error" v-if="isError">
            {{isError}}
        </li>
        <li v-for="(result, i) in results" :key="i" :class="{selected:isSelected(result)}" class="autocomplete-item" @click="setResult(result)">
            <slot :item="result">{{ result }}</slot>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'Autocomplete',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
        label: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Search for an item...',
        },
        error: {
            type: String,
            required: false,
            default: '',
        },
        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
        multi: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            focused: false,
            inputText: '',
            selected: [],
            results: [],
            isOpen: false,
            arrowCounter: -1,
        };
    },
    mounted() {
        this.results = this.items;
        document.addEventListener('click', this.clickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.clickOutside);
    },
    computed: {
        isError() {
            return this.error ? this.error : false
        },
        isLoading() {
            return this.loading ? this.loading : false
        },
        inputPlaceholder() {
            return this.selected.length == 0 ? this.placeholder : '';
        }
    },
    methods: {
        setResult(result) {
            this.inputText = '';
            this.isOpen = false;
            this.select(result);
        },
        filterResults() {
            this.results = this.items;
        },
        clickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        focus() {
            this.isOpen = true;
            this.focused = true;
        },
        blur() {
            this.focused = false;
        },
        click() {
            this.isOpen = true;
            this.$refs.input.focus();
        },
        change() {
            // Let's warn the parent that a change was made
            this.$emit('search', this.inputText);
            // Is the data given by an outside ajax request?
            // Let's  our flat array
            this.filterResults();
        },
        arrowDown() {
            if (this.arrowCounter < this.results.length-1) {
                this.arrowCounter++;
                this.select(this.results[this.arrowCounter]);
            }
        },
        arrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
                this.select(this.results[this.arrowCounter]);
            }
        },
        enter() {
            this.isOpen = false;
            this.select(this.results[this.arrowCounter]);
        },
        select(items) {
            this.inputText = this.label?items[this.label]:items;
            this.selected = items;
            this.$emit('selected', this.selected);
            this.$emit('input', this.selected);
        },
        isSelected(item){
            return this.selected==item;
        }
    },
    watch: {
      // Once the items content changes, it means the parent component
      // provided the needed data
      items: function (value, oldValue) {
        // we want to make sure we only do this when it's an async request
        //if (this.isAsync) {
          this.results = value;
        //   this.isOpen = true;
        //}
      }
    }
}
</script>
<style lang="postcss">
.autocomplete {
    background: var(--color-primary);
    position: relative;
    .form-input {
        padding: .8rem 1rem;
        display: flex;
        align-items: center;
        &:focus input,
        &:hover input {
            box-shadow: none;
            border: 0 none;
        }

        input {
            display: block;
            border: 0 none;
            width: 100%;

            &:focus,
            &:hover {
                box-shadow: none;
                border: 0 none;
            }
        }
    }
}

.autocomplete-items {
    position: absolute;
    z-index: 99;
    background: #fff;
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    max-height: 300px;
    overflow: auto;
    width: 100%;
    box-shadow: var(--shadow-up);
    border-radius: var(--border-radius);
}

.autocomplete-item {
    list-style: none;
    text-align: left;
    padding: 8px 20px;
    cursor: pointer;
}

.autocomplete-item.selected,
.autocomplete-item.is-active,
.autocomplete-item:hover {
    background-color: var(--color-primary);
    color: white;
}

</style>