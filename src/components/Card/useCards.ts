import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CARD, DELETE_CARD, GET_CARD, UPDATE_CARD } from "./Card.graphql";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

interface Card {
  title?: string;
  description?: string;
}

interface CardsData {
  cards_by_pk: Card;
}

function useCards() {
  const { cardNumber } = useParams();
  const isNew = typeof cardNumber === "undefined";
  const navigate = useNavigate();
  const toast = useToast();

  const {
    loading: loadingCards,
    error: errorCards,
    data: dataCards,
    refetch,
  } = useQuery<CardsData>(GET_CARD, {
    variables: {
      id: cardNumber,
    },
    skip: isNew,
  });

  const [addCardMutation, { loading: loadingAddCards, error: errorAddCards }] =
    useMutation(ADD_CARD);
  const [
    deleteCardMutation,
    { loading: loadingDeleteCards, error: errorDeleteCards },
  ] = useMutation(DELETE_CARD);
  const [
    updateCardMutation,
    { loading: loadingUpdateCards, error: errorUpdateCards },
  ] = useMutation(UPDATE_CARD);

  const [title, setTitle] = useState("");
  useEffect(() => {
    if (dataCards?.cards_by_pk.title) {
      setTitle(dataCards?.cards_by_pk.title);
    }
  }, [dataCards?.cards_by_pk.title]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (dataCards?.cards_by_pk.description) {
      setDescription(dataCards?.cards_by_pk.description);
    }
  }, [dataCards?.cards_by_pk.description]);

  const addHandler = useCallback(
    async (e: SyntheticEvent) => {
      try {
        e.preventDefault();
        const res = await addCardMutation({
          variables: {
            object: {
              title,
              description,
            },
          },
        });
        navigate(`/${res?.data?.insert_cards_one?.id}`);
      } catch (err) {
        toast({
          title: "Error card",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [addCardMutation, toast, navigate, title, description]
  );

  const deleteHandler = useCallback(async () => {
    try {
      const res = await deleteCardMutation({
        variables: {
          id: cardNumber,
        },
      });
      navigate("/");
      toast({
        title: `Success delete card: ${res?.data?.delete_cards_by_pk?.id}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error card",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [deleteCardMutation, toast, navigate, cardNumber]);

  const updateHandler = useCallback(
    async (e: SyntheticEvent) => {
      try {
        e.preventDefault();
        const res = await updateCardMutation({
          variables: {
            id: cardNumber,
            object: {
              title,
              description,
            },
          },
        });
        refetch({ id: cardNumber });
        toast({
          title: `Success update card: ${res?.data?.update?.id}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: "Error card",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [
      updateCardMutation,
      toast,
      navigate,
      refetch,
      description,
      title,
      cardNumber,
    ]
  );

  return {
    isNew,
    title,
    setTitle,
    description,
    setDescription,
    addHandler,
    updateHandler,
    deleteHandler,
    error: errorCards || errorAddCards || errorDeleteCards || errorUpdateCards,
    loading:
      loadingCards ||
      loadingAddCards ||
      loadingDeleteCards ||
      loadingUpdateCards,
  };
}

export default useCards;
