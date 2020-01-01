<template>
  <div style="min-height: 5px">
    <v-progress-linear v-if="show" indeterminate color="orange" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
