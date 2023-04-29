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
import ApplicationCard from 'components/card/ApplicationCard';
import CardsListSkeleton from "components/skeletons/CardsListSkeleton";
import useApplication from "services/hooks/application.hooks";


export default function Applications() {

const {applications, loading, error} = useApplication()

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading ? <CardsListSkeleton />
                : null
        }
        {applications.length ? <SimpleGrid
            mb='20px'
            columns={{ sm: 1, md: 2, '2xl': 4 }}
            spacing={{ base: "20px", xl: "20px" }}>
            {applications.map(({_id, name, description}) => (
                <ApplicationCard _id={_id} name={name} description={description}/>
            ))} </SimpleGrid> : null}
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
