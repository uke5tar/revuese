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

<style lang="scss" scoped>
h3 {
  font-size: 20px;
  padding: 25px 0 10px 0;
}

h4 {
  font-weight: 400;
  font-size: 16px;
  padding: 25px 0 10px 0;
}
</style>
