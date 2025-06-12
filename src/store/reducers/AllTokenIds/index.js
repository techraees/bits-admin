const AllIdsReducer = (allIds = [], action) => {
  switch (action.type) {
    case "LOAD_TOKEN_IDS":
      return action.payload;
    default:
      return allIds;
  }
};

export default AllIdsReducer;
