const AllTraReducer = (allTrans = [] , action) => {
    switch (action.type) {
      case "LOAD_TRANS":
        return action.payload;
      default:
        return allTrans;
    }
  };
  
  export default AllTraReducer;