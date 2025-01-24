const AllIdsReducer = (allIds = [], action) => {
  console.log("active", allIds, action.payload);
  switch (action.type) {
    case "LOAD_TOKEN_IDS":
      return action.payload;
    default:
      return allIds;
  }
};

export default AllIdsReducer;
