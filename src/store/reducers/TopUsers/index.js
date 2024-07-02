const INITIAL_STATE = {
  topUsersData:{
      topByBought:[],
      topBySold:[],
  }
};

const TopUserReducer = (state = INITIAL_STATE , action) => {
    console.log("active", state, action.payload);
    switch (action.type) {
      case "TOP_USERS":
        return {
          ...state,
          topUsersData: action,
      };
      default:
        return state;
    }
  };
  
  export default TopUserReducer;