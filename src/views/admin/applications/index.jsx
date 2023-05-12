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
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import ApplicationCard from 'components/card/ApplicationCard';
import Pagination from "components/pagination/Pagination";
import CardsListSkeleton from "components/skeletons/CardsListSkeleton";
import { useHistory } from "react-router-dom";
import useApplication from "services/hooks/application.hooks";


export default function Applications() {

const {applications, loading} = useApplication()

// const handleUpdateApplicationView = () => {
//   await getApplications()
//
  const history = useHistory()
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading ? <CardsListSkeleton />
                : null
        }
        {applications.length ? (
        <Flex justify={"center"} direction={"column"} gap={2}>
        <Button w="30%" onClick={() => history.push('apps/new-application')}>
            {/* <Link as={Link} to="/users/new-user" /> */}
                Add new application
        </Button>
        <SimpleGrid
            mb='20px'
            columns={{ sm: 1, md: 2, '2xl': 4 }}
            spacing={{ base: "20px", xl: "20px" }}>
            {applications.map(({id, name, description}, idx) => (
                <ApplicationCard id={id} name={name} description={description} key={`app-card-${id}`}/>
            ))} </SimpleGrid>
          <Pagination 
            page={1}
            total_pages={7}
            per_page={10}
            />
        </Flex>
        ) : null}
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
    </Box>
  );
}
