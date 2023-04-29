import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react/dist/chakra-ui-react.cjs"
import Calendar from "react-calendar"

const NewUser = () => {
    return(
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Stack justifyContent={'center'} direction={'column'} spacing={10}>
            <Heading as='h1' size='2xl' noOfLines={1} textAlign={'center'}>
                Add new User
            </Heading>
            <Flex justify={'center'}>
            <form>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type='username' />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' />
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password' />
                </FormControl>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type='name' />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='surname' />
                </FormControl>
                <FormControl>
                    <FormLabel>Birth Date</FormLabel>
                    <Calendar />
                </FormControl>
                    <Button type='button'>
                        Create User
                    </Button>
            </form>
            </Flex>
        </Stack>
    </Box>
    )
}

export default NewUser