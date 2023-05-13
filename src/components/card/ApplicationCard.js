
// Chakra imports
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import DeleteModal from "components/modals/DeleteModal";
import { useHistory } from "react-router-dom";



export default function ApplicationCard(props) {
  const { id, name, description, roles, updateApplicationsView, handleApplicationDelete,  ...rest } = props;

  const history = useHistory()

  const handleApplicationEdit = () => {
    history.push('apps/new-application',
    {
      isEdit: true,
      applicationId: id
    })
  }
    
  const {onOpen, isOpen, onClose} = useDisclosure()

  // Chakra Color Mode
  return (
  <>
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
            {name}
          </Text>
{/* 
          <Button
      onClick={() =>
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button> */}
          <Menu 
            menuItems={[
              {
                text: 'Delete application',
                iconComponent: DeleteIcon,
                clickCallback: onOpen
              },
              {
                text: 'Edit application',
                iconComponent: EditIcon,
                clickCallback: handleApplicationEdit
              },
            ]}/>
              <DeleteModal 
                title={`Delete application`}
                msg={<>Are you sure you want to delete "{name}"?<br/> (Id: - {id})</>}
                closeTxt={`Cancel`}
                confirmTxt={`Delete`}
                isOpen={isOpen}
                onClose={onClose}
                deleteCallback={() => handleApplicationDelete(id)}
              />

        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Box>
          <Text fontSize='xs'>Id</Text>
            <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
              {id}
            </Text>
          </Box>
          <Flex mt='14px'>
            <Flex direction='column'>
              <Text fontSize='xs'>Description</Text>
              <Text fontSize='sm' fontWeight='500'>
                {description}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      </Card> 
  </>
  );
}
