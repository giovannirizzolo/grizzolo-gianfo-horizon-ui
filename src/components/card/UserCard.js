
// Chakra imports
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text, createStandaloneToast, useDisclosure } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import DeleteModal from "components/modals/DeleteModal";
import useUser from "services/hooks/user.hooks";


export default function UserCard(props) {
  const { id, username, email,  ...rest } = props;

  // Chakra Color Mode
  const {onOpen, isOpen, onClose} = useDisclosure()

  const toast = createStandaloneToast()

  const {deleteUser} = useUser()

  const handleUserEdit = (id) => {

  }
  const handleUserDelete = async (userId) => {
    //show application delete modal
    const {data} = await deleteUser(userId)

    onClose()

    if(!data.message){
      //show APplication delete erro toast
      toast({
        title: 'Error on delete',
        description: `An error occurred while deleting the User`,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return 
    }

    toast({
      title: `Success`,
      description: `User deleted successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
    // show success toast
  }

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

          <Menu 
            menuItems={[
              {
                text: 'Delete user',
                iconComponent: DeleteIcon,
                clickCallback: onOpen
              },
              {
                text: 'Edit user',
                iconComponent: EditIcon,
                clickCallback: handleUserEdit(id)
              },
            ]}/>

            <DeleteModal
                title={`Delete user`}
                msg={<>Are you sure you want to delete "{username}"?<br/> (Id: - {id})</>}
                closeTxt={`Cancel`}
                confirmTxt={`Delete`}
                isOpen={isOpen}
                onClose={onClose}
                deleteCallback={() => handleUserDelete(id)}
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
