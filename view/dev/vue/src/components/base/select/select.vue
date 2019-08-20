<template>
  <div :class="wrapCls" v-clickoutside="closeDropdown">
    <div
      :class="selectionCls"
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup="true"
      aria-expanded="false"
      tabindex="0"
      @click="toggleDropdown"
    >
      <div
        class="bl-select-selection__rendered bl-select__dropdown"
        :tabindex="search ? false : '0'"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
        <template v-if="labels">
          <ul v-if="multiple">
            <li
              v-for="(text,i) in labels"
              unselectable="unselectable"
              class="bl-select-selection__choice"
              :title="text"
              style="user-select: none"
              :key="text"
            >
              <div class="bl-select-selection__choice__content">{{text}}</div>
              <!-- <span
                class="bl-select-selection__choice__remove iconfont icon-DLS_icon_web-edit_delete"
                @click="remove(i,text)"
              ></span>-->
            </li>
            <li v-if="search && multiple" class="bl-select-search bl-select-search--inline">
              <div class="bl-select-search__field__wrap">
                <input
                  class="bl-select-search__field"
                  v-model="searchVal"
                  :style="multipleSearchStyle"
                  @focus="searchFocus"
                  @blur="searchBlur"
                  ref="searchInput"
                  @keydown.delete="handleInputDelete"
                  @keydown.enter="handleInputEnter"
                  @keydown.up="handleInputMove(0)"
                  @keydown.down="handleInputMove(1)"
                />
                <span class="bl-select-search__field__mirror" ref="searchMirror">{{searchVal}}</span>
              </div>
            </li>
          </ul>
          <div
            v-else
            class="bl-select-selection-selected-value"
            :title="labels"
            :style="selectedValueStyle"
          >{{labels}}</div>
        </template>
        <div
          v-show="((multiple && !labels.length) || (!multiple && !labels)) && !searchVal"
          unselectable="unselectable"
          class="bl-select-selection__placeholder"
          style="user-select: none;"
        >{{placeholder}}</div>
        <div v-if="search && !multiple" class="bl-select-search bl-select-search--inline">
          <div class="bl-select-search__field__wrap">
            <input
              class="bl-select-search__field"
              v-model="searchVal"
              @focus="searchFocus"
              @blur="searchBlur"
              ref="searchInput"
            />
            <span class="bl-select-search__field__mirror"></span>
          </div>
        </div>
      </div>
      <span
        v-if="allowClear && labels && !multiple"
        unselectable="unselectable"
        class="bl-select-selection__clear"
        style="-webkit-user-select: none"
        @click.stop="clear"
      ></span>
    </div>
    <transition name="slide-up">
      <div
        ref="dropdown"
        v-show="show"
        style="overflow: auto;"
        :style="dropdownStyle"
        :class="dropdownCls"
      >
        <div style="overflow: auto;">
          <ul
            ref="dropDownMenu"
            class="bl-select-dropdown-menu bl-select-dropdown-menu-vertical bl-select-dropdown-menu-root"
            role="menu"
            aria-activedescendant
            :style="dropdownUlStyle"
          >
            <li
              v-if="loading"
              unselectable="unselectable"
              class="bl-select-dropdown-menu-item bl-select-dropdown-menu-item-disabled"
              role="menuitem"
              aria-selected="false"
              style="user-select: none;"
            >{{loadingText}}</li>
            <template v-else>
              <li
                v-if="searchVal && remoteMethod && !data.length"
                unselectable="unselectable"
                class="bl-select-dropdown-menu-item bl-select-dropdown-menu-item-disabled"
                role="menuitem"
                aria-selected="false"
                style="user-select: none;"
              >{{notFoundContent}}</li>
              <li
                v-if="searchVal && !remoteMethod && !searchFound"
                unselectable="unselectable"
                class="bl-select-dropdown-menu-item bl-select-dropdown-menu-item-disabled"
                role="menuitem"
                aria-selected="false"
                style="user-select: none;"
              >{{notFoundContent}}</li>
              <template v-for="(option,i) in ori_data">
                <template v-if="option.options">
                  <li v-show="option.show" class="bl-select-dropdown-menu-item-group">
                    <div class="bl-select-dropdown-menu-item-group-title">{{option[groupLabel]}}</div>
                    <ul
                      v-if="option.options.length"
                      class="bl-select-dropdown-menu-item-group-list"
                    >
                      <li
                        v-show="option.show"
                        v-for="(item,index) in option.options"
                        :key="index"
                        unselectable="unselectable"
                        :class="['bl-select-dropdown-menu-item', {'bl-select-dropdown-menu-item-disabled': item.disabled}, {'bl-select-dropdown-menu-item-selected': item.selected}]"
                        role="menuitem"
                        aria-selected="false"
                        style="user-select: none;"
                        @click="select([i,index])"
                      >
                        <slot :data="option">{{item[label]}}</slot>
                      </li>
                    </ul>
                  </li>
                </template>
                <template v-else>
                  <li
                    v-show="option.show"
                    unselectable="unselectable"
                    :class="['bl-select-dropdown-menu-item',
                                    {'bl-select-dropdown-menu-item-disabled': option.disabled},
                                    {'bl-select-dropdown-menu-item-selected': option.selected},
                                    {'bl-select-dropdown-menu-item-likehover': showDataIndex === i}]"
                    role="menuitem"
                    aria-selected="false"
                    style="user-select: none;"
                    @click="select(i)"
                  >
                    <slot :data="option">{{option[label]}}</slot>
                  </li>
                </template>
              </template>
            </template>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getOffset } from "../../../common/utiles/tool";
import emitter from "./emitter";
import clickoutside from "./clickoutside.directives";
export default {
  name: "blSelect",
  mixins: [emitter],
  directives: { clickoutside },
  data() {
    return {
      prefix: "bl-select",
      innerValue: this.multiple && !this.value ? [] : this.value,
      searchVal: "",
      multipleSearchStyle: {},
      searchFound: false,
      show: false,
      dropdownStyle: {},
      dropdownUlStyle: {},
      labels: this.multiple ? [] : "",
      ori_data: JSON.parse(JSON.stringify(this.data)),
      isSearchFocus: false,
      dropdownHeight: 0,
      container: null,
      keySelectIndex: -1,
      dropItemNodeList: []
    };
  },
  props: {
    clue: {
      type: String,
      default: "value"
    },
    label: {
      type: String,
      default: "label"
    },
    groupLabel: {
      type: String,
      default: "label"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    notFoundContent: {
      type: String,
      default: "没有找到"
    },
    placement: {
      type: String,
      default: "bottom"
    },
    search: {
      type: Boolean,
      default: false
    },
    filter: Function,
    maxHeight: {
      type: Number,
      default: 300
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String, Array],
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    data: {
      type: Array,
      default: () => []
    },
    popupContainer: {
      type: Function,
      default: () => document.body
    },
    size: String,
    position: {
      type: String,
      default: "absolute"
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "加载中..."
    },
    remoteMethod: Function,
    optionOnChange: {
      type: Boolean,
      default: false
    },
    dropdownWidth: {
      type: String
    }
  },
  mounted() {
    this.initVal();
    this.container = this.popupContainer();
    this.$refs.dropdown.style.position = this.position;
    this.container.appendChild(this.$refs.dropdown);
    window.addEventListener("resize", this.setPosition);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setPosition);
    this.container.removeChild(this.$refs.dropdown);
  },
  watch: {
    innerValue(val) {
      this.$emit("input", val);
      this.dispatch("FormItem", "form.change", [val]);
      if (this.optionOnChange) {
        this.$nextTick(() => {
          this.$emit("change", this.getOption(val));
        });
      } else {
        this.$emit("change", val);
      }
    },
    value(val) {
      if (this.innerValue !== val) {
        this.innerValue = val;
        this.$nextTick(() => {
          this.initVal();
        });
      }
    },
    searchVal(val) {
      this.$emit("search", val);
      this.initKeySelectIndex(); // 输入新内容清除键盘指向
      if (this.multiple) {
        this.$nextTick(() => {
          this.multipleSearchStyle = val
            ? { width: `${this.$refs.searchMirror.offsetWidth + 2}px` }
            : {};
        });
      }
      if (this.remoteMethod) return this.remoteMethod(val);
      if (val) {
        this.searchFound = false;
        let show = false;
        this.$nextTick(() => {
          this.mapData(
            ([type, path, item]) => {
              const isIncluded = this.filter
                ? this.filter(val, item)
                : item[this.label].includes(val);
              if (isIncluded) this.searchFound = true;
              if (type === "item") {
                this.$set(this.ori_data[path], "show", isIncluded);
              } else {
                this.$set(
                  this.ori_data[path[0]].options[path[1]],
                  "show",
                  isIncluded
                );
                if (isIncluded) show = true;
              }
            },
            i => {
              this.$set(this.ori_data[i], "show", show);
              show = false;
            }
          );
        });
      } else {
        this.setData({ show: true }, { show: true });
      }
    },
    data: {
      handler(val) {
        this.ori_data = JSON.parse(JSON.stringify(val));
        this.mapData(
          ([type, path, item]) => {
            let selected = false;
            if (this.multiple && this.innerValue.includes(item[this.clue])) {
              selected = true;
              if (!this.labels.includes(item[this.label]))
                this.labels.push(item[this.label]);
            } else if (!this.multiple && this.innerValue === item[this.clue]) {
              selected = true;
              this.labels = item[this.label];
            }
            if (type === "item") {
              this.$set(this.ori_data[path], "selected", selected);
              this.$set(this.ori_data[path], "show", true);
            } else {
              this.$set(
                this.ori_data[path[0]].options[path[1]],
                "selected",
                selected
              );
              this.$set(this.ori_data[path[0]].options[path[1]], "show", true);
            }
          },
          i => {
            this.$set(this.ori_data[i], "show", true);
          }
        );
        if (this.show) {
          this.$nextTick(() => {
            this.setPosition();
          });
        }
      },
      deep: true
    }
  },
  computed: {
    wrapCls() {
      let $VUEBEAUTYSIZE = "";
      if (this.$VUEBEAUTY.size === "small") {
        $VUEBEAUTYSIZE = "sm";
      } else if (this.$VUEBEAUTY.size === "large") {
        $VUEBEAUTYSIZE = "lg";
      }
      return [
        this.prefix,
        { [`${this.prefix}-disabled`]: this.disabled },
        {
          [`${this.prefix}-${this.size || $VUEBEAUTYSIZE}`]:
            this.size || $VUEBEAUTYSIZE
        }
      ];
    },
    selectionCls() {
      return [
        `${this.prefix}-selection`,
        { [`${this.prefix}-selection--single`]: !this.multiple },
        { [`${this.prefix}-selection--multiple`]: this.multiple }
      ];
    },
    dropdownCls() {
      return [
        `${this.prefix}-dropdown`,
        `${this.prefix}-dropdown-placement-bottomLeft`,
        { [`${this.prefix}-dropdown--single`]: !this.multiple },
        { [`${this.prefix}-dropdown--multiple`]: this.multiple }
      ];
    },
    selectedValueStyle() {
      let opacity = 1;
      // Blur时isSearchFocus为false，但searchVal延时清空了，所以这里单独判断
      if (this.searchVal) {
        opacity = 0;
      } else if (this.isSearchFocus) {
        opacity = 0.4;
      }
      return { opacity };
    },
    oriShowData() {
      const showData = this.ori_data.filter(item => item.show);
      return showData;
    },
    showDataIndex() {
      return this.ori_data.indexOf(this.oriShowData[this.keySelectIndex]);
    }
  },
  methods: {
    getOption(val) {
      let res;
      let selected = val;
      if (this.multiple) {
        res = [];
        selected = [...val];
      }
      this.mapData(([, , item]) => {
        if (this.multiple) {
          const i = selected.indexOf(item[this.clue]);
          if (i !== -1) {
            res.push({ ...item });
            selected.splice(i, 1);
            if (!selected.length) return true;
          }
        } else if (item[this.clue] === val) {
          res = { ...item };
          return true;
        }
      });
      return res;
    },
    mapData(callback, groupCallback) {
      for (const [i, opt] of this.ori_data.entries()) {
        if (opt.options) {
          if (opt.options.length) {
            for (const [j, item] of opt.options.entries()) {
              const res = callback(["groupItem", [i, j], item]);
              if (res) break;
            }
            groupCallback && groupCallback(i, opt);
          }
        } else {
          const res = callback(["item", i, opt]);
          if (res) break;
        }
      }
    },
    initVal() {
      this.labels = this.multiple ? [] : "";
      this.mapData(
        ([type, path, item]) => {
          let selected = false;
          if (this.multiple && this.innerValue.includes(item[this.clue])) {
            selected = true;
            this.labels.push(item[this.label]);
          } else if (!this.multiple && this.innerValue === item[this.clue]) {
            selected = true;
            this.labels = item[this.label];
          }
          if (type === "item") {
            this.$set(this.ori_data[path], "selected", selected);
            this.$set(this.ori_data[path], "show", true);
          } else {
            this.$set(
              this.ori_data[path[0]].options[path[1]],
              "selected",
              selected
            );
            this.$set(this.ori_data[path[0]].options[path[1]], "show", true);
          }
        },
        i => {
          this.$set(this.ori_data[i], "show", true);
        }
      );
    },
    getDropdownHeight() {
      this.dropdownHeight = parseFloat(
        getComputedStyle(this.$refs.dropdown, null).height
      );
    },
    setData(opt, groupOpt) {
      this.mapData(
        ([type, path]) => {
          if (type === "item") {
            for (const [key, val] of Object.entries(opt)) {
              this.$set(this.ori_data[path], key, val);
            }
          } else {
            for (const [key, val] of Object.entries(opt)) {
              this.$set(this.ori_data[path[0]].options[path[1]], key, val);
            }
          }
        },
        i => {
          if (groupOpt) {
            for (const [key, val] of Object.entries(groupOpt)) {
              this.$set(this.ori_data[i], key, val);
            }
          }
        }
      );
    },
    setPosition() {
      this.getDropdownHeight();
      if (!this.$el) return;
      const p = getOffset(this.$el, this.container);
      const dwidth = this.dropdownWidth || `${p.right - p.left}px`;
      this.dropdownStyle = {
        top: `${
          this.placement === "top"
            ? p.top - this.dropdownHeight - 4
            : p.bottom + 4
        }px`,
        left: `${p.left}px`,
        width: dwidth,
        maxHeight: `${this.maxHeight}px`
      };
      this.dropdownUlStyle = {
        maxHeight: `${this.maxHeight}px`
      };
      this.dropItemNodeList = this.$refs.dropDownMenu.querySelectorAll("li");
    },
    closeDropdown() {
      this.show = false;
    },
    toggleDropdown() {
      if (this.disabled) return;
      if (this.search) {
        this.show = true;
        this.$refs.searchInput.focus();
      } else {
        this.show = !this.show;
      }
      if (this.show) {
        this.$nextTick(() => {
          this.setPosition();
        });
      }
    },
    searchBlur() {
      this.isSearchFocus = false;
      // 多选时，searchVal必须延迟清空，否则选不上
      setTimeout(() => {
        this.searchVal = "";
      }, 300);
      this.$emit("blur");
    },
    searchFocus() {
      this.isSearchFocus = true;
      this.initKeySelectIndex();
      this.$emit("focus");
    },
    clear() {
      this.innerValue = "";
      this.labels = "";
      this.setData({ selected: false });
    },
    handleInputDelete() {
      if (this.multiple && this.innerValue.length && this.searchVal === "") {
        this.remove(
          this.innerValue.length - 1,
          this.labels[this.innerValue.length - 1]
        );
      }
    },
    handleInputEnter() {
      if (
        (this.keySelectIndex === -1 || !this.oriShowData.length) &&
        this.searchVal
      ) {
        // -1表示直接填入输入内容，非-1表示选中当前item，但没有匹配项时直接填入内容
        let isExistIndex = -1;
        const isExist = this.ori_data.some((item, index) => {
          isExistIndex = index;
          return item.label === this.searchVal;
        });
        if (!isExist) {
          this.ori_data.push({
            [this.clue]: null, // 手动输入的值，clue默认为null，并加入ori_data列表中。
            [this.label]: this.searchVal
          });
          this.select(this.ori_data.length - 1);
        } else {
          this.select(isExistIndex);
        }
      } else {
        this.select(this.showDataIndex);
      }
    },
    handleInputMove(type = 1) {
      // type，0:up 1:down
      if (type) {
        this.keySelectIndex < this.oriShowData.length - 1 &&
          this.keySelectIndex++;
      } else {
        this.keySelectIndex > 0 && this.keySelectIndex--;
      }
      const itemNode = this.dropItemNodeList[this.showDataIndex];
      itemNode && itemNode.scrollIntoView(false);
    },
    initKeySelectIndex() {
      this.keySelectIndex = -1;
    },
    remove(i, text) {
      this.labels.splice(i, 1);
      this.innerValue.splice(i, 1);
      this.mapData(([type, path, item]) => {
        if (item[this.label] === text) {
          if (type === "item") {
            this.$set(this.ori_data[path], "selected", false);
          } else {
            this.$set(
              this.ori_data[path[0]].options[path[1]],
              "selected",
              false
            );
          }
          return true;
        }
      });
    },
    select(path) {
      let opt;
      if (typeof path === "number") {
        opt = this.ori_data[path];
      } else {
        opt = this.ori_data[path[0]].options[path[1]];
      }
      if (opt.disabled) return;
      this.searchVal = "";
      if (!this.multiple) this.setData({ selected: false });
      if (this.multiple) {
        if (opt.selected) {
          const j = this.labels.indexOf(opt[this.label]);
          this.labels.splice(j, 1);
          this.innerValue.splice(j, 1);
        } else {
          this.innerValue.push(opt[this.clue]);
          this.labels.push(opt[this.label]);
        }
        opt.selected = !opt.selected;
      } else {
        opt.selected = true;
        this.innerValue = opt[this.clue];
        this.labels = opt[this.label];
      }
    }
  }
};
</script>
<style lang="less" scoped>
@select-prefix-cls: ~"bl-select";

.@{select-prefix-cls} {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  color: fade(#000, 65%);
  font-size: 12px;

  > ul > li > a {
    padding: 0;
    background-color: #fff;
  }

  // arrow
  &-arrow {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:before {
      display: block;
    }
    position: absolute;
    top: 50%;
    right: 8px;
    line-height: 1;
    margin-top: -6px;
    color: fade(#000, 43%);

    * {
      display: none;
    }

    &:before {
      transition: transform 0.2s ease;
    }
  }

  &-selection {
    outline: none;
    user-select: none;

    box-sizing: border-box;
    display: block;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover &__clear {
      opacity: 1;
    }

    &-selected-value {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      padding-right: 14px;
    }
  }

  &-disabled {
    color: fade(#000, 25%);
  }

  &-disabled &-selection {
    background: #f7f7f7;
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active {
      border-color: #d9d9d9;
      box-shadow: none;
    }

    &__clear {
      display: none;
      visibility: hidden;
      pointer-events: none;
    }
  }

  &-disabled &-selection--multiple &-selection__choice {
    background: #eee;
    color: #aaa;
    padding-right: 10px;
    &__remove {
      display: none;
    }
  }

  &-selection--single {
    height: 28px;
    position: relative;
    cursor: pointer;
  }

  &-selection__rendered {
    display: block;
    margin-left: 7px;
    margin-right: 7px;
    position: relative;
    line-height: 28px - 2px;
    &:after {
      content: ".";
      visibility: hidden;
      pointer-events: none;
      display: inline-block;
      width: 0;
    }
  }

  &-lg {
    .@{select-prefix-cls}-selection--single {
      height: 32px;
    }
    .@{select-prefix-cls}-selection__rendered {
      line-height: 32px - 2px;
    }
    .@{select-prefix-cls}-selection--multiple {
      min-height: 32px;
      .@{select-prefix-cls}-selection__rendered {
        li {
          height: 32px - 8px;
          line-height: 32px- 8px;
        }
      }
      .@{select-prefix-cls}-selection__clear {
        top: 32px / 2;
      }
    }
  }

  &-sm {
    .@{select-prefix-cls}-selection--single {
      height: 22px;
    }
    .@{select-prefix-cls}-selection__rendered {
      line-height: 22px - 2px;
    }
    .@{select-prefix-cls}-selection--multiple {
      min-height: 22px;
      .@{select-prefix-cls}-selection__rendered {
        li {
          height: 22px - 8px;
          line-height: 22px - 8px;
        }
      }
      .@{select-prefix-cls}-selection__clear {
        top: 22px / 2;
      }
    }
  }

  &-disabled &-selection__choice__remove {
    color: fade(#000, 25%);
    cursor: default;
    &:hover {
      color: fade(#000, 25%);
    }
  }

  &-search__field__wrap {
    display: inline-block;
    position: relative;
  }

  &-selection__placeholder,
  &-search__field__placeholder {
    // for TreeSelect compatibility
    position: absolute;
    top: 50%;
    left: 0;
    right: 9px;
    color: hsv(0, 0, 75%);
    line-height: 20px;
    height: 20px;
    max-width: 100%;
    margin-top: -10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  &-search__field__placeholder {
    left: 8px;
  }

  &-search__field__mirror {
    position: absolute;
    top: 0;
    left: -9999px;
    white-space: pre;
    pointer-events: none;
  }

  &-search--inline {
    position: absolute;
    height: 100%;
    width: 100%;

    .@{select-prefix-cls}-selection--multiple & {
      float: left;
      position: static;
    }

    .@{select-prefix-cls}-search__field__wrap {
      width: 100%;
      height: 100%;
    }

    .@{select-prefix-cls}-search__field {
      border-width: 0;
      font-size: 100%;
      height: 100%;
      width: 100%;
      background: transparent;
      outline: 0;
      border-radius: 4px;
      line-height: 1;
    }

    > i {
      float: right;
    }
  }

  &-selection--multiple {
    min-height: 28px;
    cursor: text;
    padding-bottom: 3px;

    .@{select-prefix-cls}-search--inline {
      width: auto;
      padding: 0;
      max-width: 100%;
      .@{select-prefix-cls}-search__field {
        max-width: 100%;
        width: 0.75em;
      }
    }

    .@{select-prefix-cls}-selection__rendered {
      margin-left: 5px;
      margin-bottom: -3px;
      height: auto;
    }

    > ul > li,
    .@{select-prefix-cls}-selection__rendered > ul > li {
      // for tree-select
      margin-top: 3px;
      height: 28px - 8px;
      line-height: 28px - 8px;
    }

    .@{select-prefix-cls}-selection__choice {
      color: fade(#000, 65%);
      background-color: #f3f3f3;
      border-radius: 4px;
      cursor: default;
      float: left;
      margin-right: 4px;
      max-width: 99%;
      position: relative;
      overflow: hidden;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      padding: 0 20px 0 10px;
      &__disabled {
        padding: 0 10px;
      }
    }

    .@{select-prefix-cls}-selection__choice__content {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      transition: margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .@{select-prefix-cls}-selection__choice__remove {
      display: inline-block;
      font-style: normal;
      vertical-align: baseline;
      text-align: center;
      text-transform: none;
      line-height: 1;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before {
        display: block;
      }
      color: fade(#000, 43%);
      line-height: inherit;
      cursor: pointer;
      display: inline-block;
      font-weight: bold;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: absolute;
      right: 4px;
      padding: 0 0 0 8px;
      &:hover {
        color: #404040;
      }
    }

    .@{select-prefix-cls}-selection__clear {
      top: 28px / 2;
    }
  }

  &-allow-clear &-selection--multiple &-selection__rendered {
    margin-right: 20px; // In case that clear button will overlap content
  }

  &-open {
    .@{select-prefix-cls}-arrow {
      -ms-transform: rotate(180deg);
      &:before {
        transform: rotate(180deg);
      }
    }
    .@{select-prefix-cls}-selection {
    }
  }

  &-combobox {
    .@{select-prefix-cls}-arrow {
      display: none;
    }
    .@{select-prefix-cls}-search--inline {
      height: 100%;
      width: 100%;
      float: none;
    }
    .@{select-prefix-cls}-search__field__wrap {
      width: 100%;
      height: 100%;
    }
    .@{select-prefix-cls}-search__field {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      box-shadow: none;
    }
  }
  &-combobox&-allow-clear &-selection:hover &-selection__rendered {
    margin-right: 20px; // In case that clear button will overlap content
  }
}

.@{select-prefix-cls}-dropdown {
  &.slide-up-enter.slide-up-enter-active&-placement-bottomLeft,
  &.slide-up-appear.slide-up-appear-active&-placement-bottomLeft {
    animation-name: antSlideUpIn;
  }

  &.slide-up-enter.slide-up-enter-active&-placement-topLeft,
  &.slide-up-appear.slide-up-appear-active&-placement-topLeft {
    animation-name: antSlideDownIn;
  }

  &.slide-up-leave.slide-up-leave-active&-placement-bottomLeft {
    animation-name: antSlideUpOut;
  }

  &.slide-up-leave.slide-up-leave-active&-placement-topLeft {
    animation-name: antSlideDownOut;
  }

  &-hidden {
    display: none;
  }

  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 1050;
  left: -9999px;
  top: -9999px;
  position: absolute;
  outline: none;
  overflow: hidden;
  font-size: 12px;

  &-menu {
    outline: none;
    margin-bottom: 0;
    padding-left: 0; // Override default ul/ol
    list-style: none;
    max-height: 250px;
    overflow: auto;

    &-item-group-list {
      margin: 0;
      padding: 0;

      > .@{select-prefix-cls}-dropdown-menu-item {
        padding-left: 16px;
      }
    }

    &-item-group-title {
      color: fade(#000, 43%);
      line-height: 1.5;
      padding: 8px;
    }

    &-item {
      position: relative;
      display: block;
      padding: 7px 8px;
      font-weight: normal;
      color: fade(#000, 65%);
      white-space: nowrap;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.3s ease;

      &:hover {
        background-color: tint(#108ee9, 90%);
      }

      &-likehover {
        background-color: tint(#108ee9, 90%);
      }

      &-disabled {
        color: fade(#000, 25%);
        cursor: not-allowed;

        &:hover {
          color: fade(#000, 25%);
          background-color: #fff;
          cursor: not-allowed;
        }
      }

      &-selected {
        &,
        &:hover {
          background-color: #f7f7f7;
          font-weight: 600;
          color: fade(#000, 65%);
        }
      }

      &-active {
        background-color: tint(#108ee9, 90%);
      }

      &-divider {
        height: 1px;
        margin: 1px 0;
        overflow: hidden;
        background-color: #e5e5e5;
        line-height: 0;
      }
    }
  }

  &&--multiple {
    .@{select-prefix-cls}-dropdown-menu-item {
      &:after {
        color: transparent;
        transition: all 0.2s ease;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 8px;
        font-weight: bold;
        text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
      }

      &:hover:after {
        color: #ddd;
      }

      &-likehover:after {
        color: #ddd;
      }

      &-disabled:after {
        display: none;
      }

      &-selected:after,
      &-selected:hover:after {
        color: tint(#108ee9, 90%);
        display: inline-block;
      }
    }
  }

  &-container-open,
  &-open {
    .@{select-prefix-cls}-dropdown {
      display: block;
    }
  }
}

.bl-select-selection__choice__remove {
  top: 0;
}
.bl-select__dropdown:focus {
  outline: 0px solid transparent;
}
@keyframes antSlideUpIn {
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
}

@keyframes antSlideUpOut {
  0% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0.8);
  }
}

@keyframes antSlideDownIn {
  0% {
    opacity: 0;
    transform-origin: 100% 100%;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform-origin: 100% 100%;
    transform: scaleY(1);
  }
}

@keyframes antSlideDownOut {
  0% {
    opacity: 1;
    transform-origin: 100% 100%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 100% 100%;
    transform: scaleY(0.8);
  }
}

@keyframes antSlideLeftIn {
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleX(0.8);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleX(1);
  }
}

@keyframes antSlideLeftOut {
  0% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleX(1);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleX(0.8);
  }
}

@keyframes antSlideRightIn {
  0% {
    opacity: 0;
    transform-origin: 100% 0%;
    transform: scaleX(0.8);
  }
  100% {
    opacity: 1;
    transform-origin: 100% 0%;
    transform: scaleX(1);
  }
}

@keyframes antSlideRightOut {
  0% {
    opacity: 1;
    transform-origin: 100% 0%;
    transform: scaleX(1);
  }
  100% {
    opacity: 0;
    transform-origin: 100% 0%;
    transform: scaleX(0.8);
  }
}
</style>