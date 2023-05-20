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
      user_id
    }
  }
`;

export { GET_ALL_CONTACTS, GET_PROFILE_DETAILS_QUERY, GET_ALL_NFTS };
