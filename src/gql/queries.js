import { gql } from "@apollo/client";

const GET_ALL_NFTS = gql`
  query getAllNfts($walletAddress: String!) {
    getAllNfts(walletAddress: $walletAddress) {
      _id
      artist_name1
      description
      metauri
      status
      isEmote
      rid
      video
      wallet_address
      token_id
      chainId
      supply
      royalty
      name
      isPaid
      video_duration
      category
      likeCount
      watchCount
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    LoginUser(email: $email, password: $password) {
      token
      user_address
      full_name
      country
      bio
      profileImg
      id
    }
  }
`;

const GET_PROFILE = gql`
  query GetProfile($token: String!) {
    GetProfile(token: $token) {
      bio
      country
      id
      profileImg
      token
      user_address
      dob
      full_name
    }
  }
`;

const GET_PLAYER = gql`
  query Query($id: String!) {
    GetPlayer(id: $id) {
      createdAt
      id
      linkingInfo
      updatedAt
      wallet
      __typename
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $updateProfileId: String!
    $full_name: String
    $country: String
    $userAddress: String
    $bio: String
    $profileImg: String
  ) {
    UpdateProfile(
      id: $updateProfileId
      full_name: $full_name
      user_address: $userAddress
      country: $country
      bio: $bio
      profileImg: $profileImg
    ) {
      full_name
      email
      full_name
      phone_number
      user_address
      country
      bio
      profileImg
    }
  }
`;

const GET_ALL_NFTS_WITHOUT_ADDRESS = gql`
  query GetAllNftsWithoutAddress {
    getAllNftsWithoutAddress {
      _id
      artist_name1
      description
      name
      royalty
      status
      isEmote
      rid
      token_id
      chainId
      video
      wallet_address
      supply
      is_blocked
      isPaid
      video_duration
      category
      likeCount
      watchCount
      user_id {
        id
        user_name
        user_address
        profileImg
      }
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
      full_name
      createdAt
      email
      phone_number
      notes
    }
  }
`;

const GET_NFT_DETAIL_QUERY = gql`
  query GetNftDetails($id: ID!, $user_id: String) {
    getNftDetails(id: $id, user_id: $user_id) {
      _id
      artist_name1
      description
      metauri
      status
      isEmote
      rid
      video
      wallet_address
      token_id
      chainId
      supply
      royalty
      name
      isPaid
      video_duration
      category
      likeCount
      watchCount
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

const DETAILS_OF_A_NFT = gql`
  query DetailsOfANft($id: ID!) {
    DetailsOfANft(id: $id) {
      _id
      artist_name1
      description
      metauri
      status
      isEmote
      rid
      video
      wallet_address
      token_id
      chainId
      supply
      royalty
      name
      isPaid
      video_duration
      category
      likeCount
      watchCount
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

const GET_TOP_VIEW_NFTS = gql`
  query {
    getTopViewNfts {
      _id
      artist_name1
      description
      metauri
      status
      isEmote
      video
      wallet_address
      token_id
      chainId
      supply
      royalty
      name
      isPaid
      video_duration
      category
      likeCount
      watchCount
      view_count
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

const GET_TOP_NFTS = gql`
  query GetTopNfts($page: Int, $limit: Int) {
    GetTopNfts(page: $page, limit: $limit) {
      id
      duration
      nft_link
      serial_number
      nft_id {
        _id
        name
        artist_name1
        video
        description
        metauri
        user_id {
          id: String
          email: String
          token: String
          user_name: String
          user_address: String
          dob: String
          country: String
          bio: String
          profileImg: String
          phone_number: Int
          createdAt: Date
          is_login: Boolean
        }
      }
      is_Published
    }
  }
`;

export {
  GET_ALL_NFTS,
  LOGIN_USER,
  GET_PLAYER,
  UPDATE_USER_PROFILE,
  GET_PROFILE,
  GET_ALL_NFTS_WITHOUT_ADDRESS,
  GET_PROFILE_DETAILS_QUERY,
  GET_NFT_DETAIL_QUERY,
  GET_TOP_VIEW_NFTS,
  DETAILS_OF_A_NFT,
  GET_TOP_NFTS,
};
