<template>
  <component :is="type">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Title',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
