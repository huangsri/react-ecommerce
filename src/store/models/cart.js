export const cart = {
  state: {
    cartItems: []
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    addItem(state, payload) {
      const item = state.cartItems.find(item => item.productId === payload);
      if (item) {
        const cartItems = state.cartItems.map(o => {
          if (o.productId === payload) {
            return {
              ...o,
              amount: o.amount + 1
            };
          }
          return o;
        });
        return {
          ...state,
          cartItems
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            productId: payload,
            amount: 1
          }
        ]
      };
    },
    deleteItem(state, payload) {
      return state;
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    // async incrementAsync(payload, rootState) {
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   dispatch.count.increment(payload);
    // }
  })
};
