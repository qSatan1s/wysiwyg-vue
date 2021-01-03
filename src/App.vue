<template>
  <div id="app">
    <div class="container" @click="unFocus($event.target.classList)">
      <div class="buttons" @click="submit($event.target)">
        <app-button
          class="btn buttons--btn"
          v-for="button in buttons"
          :key="button.title"
          :id="button.title"
          :button="button"
          :class="{ btn_insert: button.class }"
        />
        <p
          id="copyHTML"
          class="btn buttons--copyHTML btn_insert"
          data-clipboard-target="#markdown_item"
        >
          Скопировать HTML
        </p>
      </div>
      <app-input :HeadingValue="HeadingValue" @click="focus" />
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard/dist/clipboard.min.js";
import { mapGetters } from "vuex";
import AppButton from "./components/AppButton";
import AppInput from "./components/AppInput";
export default {
  data: () => ({
    code: "vueIsBetterThanPBJ",
    supportsCB: false,
    message: "",
    HeadingValue: "",
    buttons: [
      { title: "prev", img: "prev.svg" },
      { title: "next", img: "next.svg" },
      { title: "heading", img: "font-family.svg", class: "btn_insert" },
      { title: "paragraph", img: "font.svg", class: "btn_insert" },
      { title: "images", img: "images.svg", class: "btn_insert" }
    ]
  }),
  created() {
    if (navigator.clipboard) {
      this.supportsCB = true;
    }
  },
  computed: mapGetters(["showInput"]),
  components: {
    AppButton,
    AppInput
  },
  mounted() {
    new ClipboardJS(".btn", {
      text: function() {
        var htmlBlock = document.querySelector(".markdown_item");
        return htmlBlock.innerHTML;
      }
    });
  },
  methods: {
    submit(e) {
      if (e.classList[0] === "btn") {
        if (e.id === "prev") {
          document.execCommand("undo", false, null);
        }
        if (e.id === "next") {
          document.execCommand("redo", false, null);
        }
        if (e.classList.contains("btn_insert")) {
          let textarea = document.querySelector(".textArea");
          let cursorPosition = textarea.selectionStart;
          if (e.id === "heading") {
            this.HeadingValue =
              textarea.value.substring(0, cursorPosition) +
              "# " +
              textarea.value.substring(cursorPosition, textarea.value.length);
          }
          if (e.id === "paragraph") {
            this.HeadingValue =
              textarea.value.substring(0, cursorPosition) +
              " &#013; " +
              textarea.value.substring(cursorPosition, textarea.value.length) +
              "&#010;";
          }
          if (e.id === "images") {
            let linkImage = prompt("Вставьте ссылку на картинку");
            if (linkImage) {
              this.HeadingValue =
                textarea.value.substring(0, cursorPosition) +
                ` <br/> ![Image](${linkImage}) ` +
                textarea.value.substring(cursorPosition, textarea.value.length);
            }
          }
        }
      }
    },
    unFocus(e) {
      if (e[0] !== "buttons" && e[0] !== "textArea" && e[0] !== "btn")
        this.$store.commit("showInputSwap");
    },
    focus() {
      if (this.showInput) {
        this.$store.commit("showInputSwap");
      }
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/style/_variables.scss");
body {
  background: black;
}
#app {
  position: relative;
  color: white;
  height: 100vh;
}
.buttons {
  display: flex;
  align-items: center;
  max-width: 450px;
}
.buttons--btn {
  margin: 0 6px;
  cursor: pointer;
}

.buttons--copyHTML {
  color: #639eff;
  margin: 0 6px;
  cursor: pointer;
}
</style>
