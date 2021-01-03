export default {
  state: {
    showInput: true
  },
  mutations: {
    showInputSwap(state) {
      state.showInput = !state.showInput;
    }
  },

  getters: {
    showInput: state => state.showInput
  }
};
