import { Box, Image, Button } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Link to={`/product/${item._id}`}>
        <Image width="150" height="150" src={item.photos} alt="photo" loading="lazy"/>

        <Box>
          <Box d="plex" alignItems="baseline">
            {moment(item.CreatedAt).format("DD/MM/YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}$</Box>
          <Button colorScheme="pink">Add To Basket </Button>
        </Box>
      </Link>
    </Box>
  );
}

export default Card;
