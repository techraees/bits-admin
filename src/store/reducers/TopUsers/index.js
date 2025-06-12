const INITIAL_STATE = {
  topUsersData:{
      topByBought:[],
      topBySold:[],
  }
};

const TopUserReducer = (state = INITIAL_STATE , action) => {
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