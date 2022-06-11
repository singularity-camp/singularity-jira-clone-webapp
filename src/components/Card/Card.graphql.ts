import { gql } from "@apollo/client";

export const GET_CARD = gql`
  query GetCard($id: uuid!) {
    cards_by_pk(id: $id) {
      title
      description
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($object: cards_insert_input!) {
    insert_cards_one(object: $object) {
      id
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: uuid!) {
    delete_cards_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: uuid!, $object: cards_set_input) {
    update: update_cards_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      title
      description
    }
  }
`;
