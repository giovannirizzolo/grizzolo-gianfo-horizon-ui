
// Chakra imports
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";


export default function UserCard(props) {
  const { _id, username, email,  ...rest } = props;

  // Chakra Color Mode
  return (
    <Card
      alignSelf='center'
      w={{ base: "100%", xl: "99%" }}
      h={{base: "100%"}}
      mx='auto'
      p='20px'
      {...rest}>
      <Flex direction='column' h='100%' w='100%'>
        <Flex justify='space-between' align='center' mb='15px'>
          <Text fontSize='2xl' fontWeight='bold'>
            {username}
          </Text>

        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Box>
          <Text fontSize='xs'>Id</Text>
            <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
              {_id}
            </Text>
          </Box>
          <Flex mt='14px'>
            <Flex direction='column'>
              <Text fontSize='xs'>Email</Text>
              <Text fontSize='sm' fontWeight='500'>
                {email}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
