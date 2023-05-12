const { createStandaloneToast } = require("@chakra-ui/react");

const toast = createStandaloneToast()


export const showErrorToast = ({description, title = 'Error' , duration = 3000}) => {
    toast({
        title,
        description,
        status: 'error',
        duration,
        isClosable: true
    })
}

export const showSuccessToast = ({description, title = 'Success' , duration = 3000}) => {
    toast({
        title,
        description,
        status: 'error',
        duration,
        isClosable: true
    })
}
