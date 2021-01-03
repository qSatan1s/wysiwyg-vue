<template>
  <img
    :src="require(`@/assets/images/buttons/${button.img}`)"
    :alt="button.title"
  />
</template>

<script>
export default {
  props: ["button"]
};
</script>
