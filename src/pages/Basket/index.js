import React from "react";
import { Box, Image, Button, Text, Flex } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function Basket() {
	const { items, removeFromBasket } = useBasket();
	const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  return (
	<Box p="4">
      <Text fontSize="2xl" mb="4">
        Your Basket
      </Text>

      {items.length === 0 ? (
        <Text>Your basket is empty.</Text>
      ) : (
        items.map((item) => (
          <Flex
            key={item._id}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            mb="4"
            alignItems="center"
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              src={item.photos[0]}
              alt={item.title}
              mr="4"
            />
            <Box flex="1">
              <Text fontWeight="semibold">{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.price}$</Text>
            </Box>
            <Button colorScheme="red" onClick={() => removeFromBasket(item)}>
              Remove
            </Button>
          </Flex>
        ))
      )}

      {items.length > 0 && (
        <Box mt="4">
          <Text fontSize="xl">Total: {totalPrice}$</Text>
        </Box>
      )}
    </Box>
  );
 
}

export default Basket;
