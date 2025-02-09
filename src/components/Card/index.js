import { Box, Image, Button } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((basket_item) => basket_item._id === item._id)


  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Link to={`/product/${item._id}`}>
        <Image
          width="150"
          height="150"
          src={item.photos}
          alt="photo"
          loading="lazy"
        />

        <Box>
          <Box d="plex" alignItems="baseline">
            {moment(item.CreatedAt).format("DD/MM/YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}$</Box>
        </Box>
      </Link>
      <Button colorScheme={ findBasketItem ? 'pink' : 'green'} variant="solid" onClick={() => addToBasket(item, findBasketItem)}>{ findBasketItem ? 'Remove From Basket' : 'Add To Basket'}  </Button>
    </Box>
  );
}

export default Card;
