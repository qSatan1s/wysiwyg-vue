<template>
  <div class="inputBlock">
    <div v-show="!showInput" class="textAreaBlock">
      <textarea class="textArea" v-model="text"></textarea>
    </div>
    <div class="markdown" :key="text" v-show="showInput">
      <vue-markdown id="markdown_item" class="markdown_item">{{
        markdown.textContent
      }}</vue-markdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["HeadingValue"],
  data: () => ({
    text: "Нажми на меня",
    markdown: ""
  }),
  computed: mapGetters(["showInput"]),
  mounted() {
    this.markdown = document.querySelector(".markdown_item");
    this.markdown.innerHTML = this.text;
  },
  watch: {
    HeadingValue() {
      this.text = this.HeadingValue;
      this.markdown.innerHTML = this.HeadingValue;
    },
    text() {
      const elem = document.querySelector(".textArea");
      if (elem.scrollTop > 0) {
        elem.style.height = elem.scrollHeight + "px";
      }
      this.markdown.innerHTML = this.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBlock {
  margin-top: 30px;
  height: 100%;

  background: rgba(0, 0, 0, 0);
}
.textAreaBlock {
  width: 100%;
  border: 0;
  color: white;
  height: 100%;
  padding: 0;
  min-height: 700px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  font-size: 15px;
  min-width: 100%;
  max-width: 100%;
  white-space: pre-wrap;
  textarea {
    width: 100%;
    height: 100%;
    min-height: 600px;
    resize: none;
  }
}
.markdown {
  width: 100%;
  height: 70vh;
}
</style>
