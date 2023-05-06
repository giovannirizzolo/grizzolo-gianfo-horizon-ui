/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Button, Flex } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import UserCard from "components/card/UserCard";
import CardsListSkeleton from "components/skeletons/CardsListSkeleton";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUser from "services/hooks/user.hooks";


export default function Users() {

const {users, error, loading} = useUser()
const history = useHistory()

useEffect(() => {
  console.log('[USERS]users :>> ', users);
}, [users])

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    
    {loading ? <CardsListSkeleton />
                : null
    }
    
    {users.length ? 
    (<>
    <Flex mb="20px" justify="center">
        <Button w="30%" onClick={() => history.push('users/new-user')}>
            {/* <Link as={Link} to="/users/new-user" /> */}
                Add new user
        </Button>
    </Flex>
    <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2, '2xl': 4 }}
        spacing={{ base: "20px", xl: "20px" }}>
            {
                users.map(({id, username, email}, idx) => (
                    <UserCard id={id} username={username} email={email} key={`user-${idx}`}/>
                ))
    }</SimpleGrid>
    </>)
     : null}
    </Box>
  );
}
