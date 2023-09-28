const INITIAL_STATE = {
    transactionData:{
        totalTrans:0,
        fixedprices:0,
    }
  };

const tranReducer = (state = INITIAL_STATE , action) => {
    console.log("active", state, action.payload);
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