const INITIAL_STATE = {
  transactionData: {
    totalTrans: 0,
    fixedprices: 0,
    soldnft: [],
  },
};

const tranReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOAD_TX":
      return {
        ...state,
        transactionData: action,
      };
    default:
      return state;
  }
};

export default tranReducer;
