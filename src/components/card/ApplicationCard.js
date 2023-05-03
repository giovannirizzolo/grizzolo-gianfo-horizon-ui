
// Chakra imports
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useDisclosure, createStandaloneToast } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import DeleteModal from "components/modals/DeleteModal";
import useApplication from 'services/hooks/application.hooks'



const handleApplicationEdit = (appId) => {
  
}

export default function ApplicationCard(props) {
  const { id, name, description, roles, updateApplicationsView,  ...rest } = props;
  const {deleteApplication} = useApplication() 
  const toast = createStandaloneToast()

  
  
  const {onOpen, isOpen, onClose} = useDisclosure()

  const handleApplicationDelete = async (appId) => {
    //show application delete modal
    const deleteRes = await deleteApplication(appId)

    onClose()

    if(!deleteRes){
      //show APplication delete erro toast
      toast({
        title: 'Error on delete',
        description: `An error occurred while deleting the Application`,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return 
    }

    toast({
      title: `Success`,
      description: `Application deleted successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
    // show success toast
  }

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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
                Delete application
              </MenuItem>
              <DeleteModal 
                title={`Delete application`}
                msg={<>Are you sure you want to delete "{name}"?<br/> (Id: - {id})</>}
                closeTxt={`Cancel`}
                confirmTxt={`Delete`}
                isOpen={isOpen}
                onClose={onClose}
                deleteCallback={() => handleApplicationDelete(id)}
              />
              <MenuItem icon={<EditIcon />} onClick={() => handleApplicationEdit(id)}>
                Edit application
              </MenuItem>
            </MenuList>
          </Menu>

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
