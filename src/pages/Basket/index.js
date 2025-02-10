import { useRef } from "react";
import {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Button,
  Text,
  Flex,
  Link,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";

function Basket() {
  const { items, removeFromBasket , clearBasket } = useBasket();
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState('');
  const handleSubmit = async ()=> {
    
    const itemIds = items.map((item) => item._id );
    const input = {
      address,
      items : JSON.stringify(itemIds),
    }
    const response = await postOrder(input)
    clearBasket()
    onClose()
   
  }

  const initialRef = useRef();
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
                textDecoration: "none",
                color: "black",
              }}
            >
              <Flex
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                alignItems="center"
                justifyContent="space-between"
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
          <Flex alignItems="center" justifyContent="center">
            <Text mr="4" fontSize="xl">
              Total: {totalPrice}$
            </Text>
            <Button onClick={onOpen} colorScheme="green">Order</Button>
          </Flex>
          <Modal
            initialFocusRef={initialRef}
         
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea ref={initialRef} placeholder="Your address..." value={address} onChange={(e) => setAddress(e.target.value)}/>
                </FormControl>

               
              </ModalBody>

              <ModalFooter>
                <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
}

export default Basket;
