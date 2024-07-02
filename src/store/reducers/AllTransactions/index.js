const AllTraReducer = (allTrans = [] , action) => {
    console.log("active", allTrans, action.payload);
    switch (action.type) {
      case "LOAD_TRANS":
        return action.payload;
      default:
        return allTrans;
    }
  };
  
  export default AllTraReducer;