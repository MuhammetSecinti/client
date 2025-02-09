import React from "react";
import Card from "../../components/Card";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";

function Products() {
  const {
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasNextPage,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePageExist = lastGroup?.length === 12;
      if (!morePageExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  console.log("data", data);
 
  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {/* {data.map((item, id) => (
          <Card key={id} item={item} />
        ))} */}
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex justifyContent="center">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading More..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </Flex>
    </div>
  );
}

export default Products;
