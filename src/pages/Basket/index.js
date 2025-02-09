import React from "react";
import { Box, Image, Button, Text, Flex, Link } from "@chakra-ui/react";
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
          <Box key={item._id} mb="4">
            <Link
              to={`/product/${item._id}`}
              _hover={{
                textDecoration: "none", // Alt çizgiyi kaldırdık
                color: "black", // Rengi koyu siyah yaptık
              }}
            >
              <Flex
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                alignItems="center"
                justifyContent="space-between" // Bu satır butonun sağa yerleşmesini sağlar
              >
                <Flex alignItems="center">
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={item.photos[0]}
                    alt={item.title}
                    mr="4"
                  />
                  <Box>
                    <Text fontWeight="semibold">{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price}$</Text>
                  </Box>
                </Flex>
                <Button
                  colorScheme="red"
                  onClick={() => removeFromBasket(item)}
                >
                  Remove
                </Button>
              </Flex>
            </Link>
          </Box>
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
