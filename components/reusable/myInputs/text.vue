<template>
  <div :class="['text-input-wrapper', dir ? dir : '']">
    <input
      :value="modelValue?.toString()"
      :class="['text-input', !delay ? 'no-delay-input' : '']"
      :inputmode="inputmode ? inputmode : 'text'"
      :id="id"
      type="text"
      :autocomplete="autocomplete"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
// * props and emits
type IAutocomplete =
  | "on"
  | "off"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "username"
  | "new-password"
  | "current-password"
  | "email"
  | "impp"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-local-prefix"
  | "tel-local-suffix"
  | "tel-extension"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "url"
  | "photo"
  | "one-time-code";

const props = defineProps<{
  modelValue?: string | number;
  delay?: number;
  placeholder?: string;
  id?: string;
  autocomplete?: IAutocomplete;
  inputmode?:
    | "text"
    | "search"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal";
  dir?: "ltr" | "rtl";
  type?: "number" | "text";
}>();
const emit = defineEmits(["update:modelValue", "loading"]);

// * functions
let updateValueTimeOut: any;
function sanitizeNumber(e: any) {
  const input = e.target as HTMLInputElement;
  const persianToLatinMap: { [key: string]: string } = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  let sanitizedValue = input.value;

  sanitizedValue = sanitizedValue.replace(
    /[۰-۹]/g,
    (char: string) => persianToLatinMap[char]
  );
  sanitizedValue = sanitizedValue.replace(/\D/g, "");
  input.value = sanitizedValue;
}
function handleInput(e: any) {
  if (props.type === "number") {
    sanitizeNumber(e);
  }

  if (props.delay) {
    clearTimeout(updateValueTimeOut);
    updateValueTimeOut = setTimeout(updateValue, 1000);

    function updateValue() {
      try {
        emit("update:modelValue", e.target.value);
      } catch (error: any) {}
    }
  } else {
    emit("update:modelValue", e.target.value);
  }
}
</script>

<style lang="scss">
.text-input-wrapper {
  width: 100%;
  display: flex;
  align-items: center;

  .text-input {
    background-color: $optional-bg;
    font-size: 1.1em;
    width: 100%;
    border: 1px solid $primary;
    padding: 3px;
    border-radius: 10px;
    height: 40px;
    outline: none;
    &:focus {
      border: 1px solid $secondary;
    }
    &.no-delay-input {
      padding: 5px 10px;
      font-size: 0.9em;
    }
  }
  &.rtl {
    .text-input {
      direction: rtl;
    }
  }
  &.ltr {
    .text-input {
      direction: ltr;
    }
  }
}
</style>
