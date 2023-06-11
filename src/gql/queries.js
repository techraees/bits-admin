import { gql } from "@apollo/client";

const GET_ALL_CONTACTS = gql`
  query GetAllUsers {
    GetAllUsers {
      bio
      email
      country
      id
      token
      profileImg
      user_address
      user_name
      phone_number
    }
  }
`;

const GET_PROFILE_DETAILS_QUERY = gql`
  query GetProfileDetails($getProfileDetailsId: String!) {
    GetProfileDetails(id: $getProfileDetailsId) {
      country
      id
      profileImg
      bio
      user_address
      user_name
      bio
      profileImg
      createdAt
      email
      phone_number
      notes
    }
  }
`;

const GET_ALL_NFTS = gql`
  query getAllNfts($walletAddress: String!) {
    getAllNfts(walletAddress: $walletAddress) {
      _id
      artist_name1
      description
      status
      video
      wallet_address
      token_id
      supply
      name
    }
  }
`;

// dashboard

const GET_USERS_COUNT = gql`
  query GetAllUsersCount {
    GetAllUsersCount {
      registered
      active
      totalVisits
      uniqueVisitors
    }
  }
`;

const GET_ALL_NFTS_FOR_ADMIN = gql`
  query GetAllNftsWithoutAddress {
    getAllNftsWithoutAddress {
      _id
      artist_name1
      description
      name
      royalty
      status
      token_id
      video
      wallet_address
      is_blocked
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

export {
  GET_ALL_CONTACTS,
  GET_PROFILE_DETAILS_QUERY,
  GET_ALL_NFTS,
  GET_USERS_COUNT,
  GET_ALL_NFTS_FOR_ADMIN,
};
// count={totalRegistered?.GetAllUsersCount?.registered}
