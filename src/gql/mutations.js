import { gql } from "@apollo/client";

const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail(
    $to: String!
    $from: String!
    $subject: String!
    $text: String!
  ) {
    SendEmail(to: $to, from: $from, subject: $subject, text: $text) {
      message
      status
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteProfile($values: DeleteInput) {
    DeleteProfile(values: $values) {
      is_deleted
    }
  }
`;

const ADD_NOTES_MUTATION = gql`
  mutation AddNotes($values: AddNotesInput) {
    AddNotes(values: $values) {
      description
      title
    }
  }
`;

const UPDATE_NFT_STATUS = gql`
  mutation UpdateNftStatus($id: String!) {
    UpdateNftStatus(id: $id) {
      is_blocked
    }
  }
`;

export {
  SEND_EMAIL_MUTATION,
  DELETE_MUTATION,
  ADD_NOTES_MUTATION,
  UPDATE_NFT_STATUS,
};
