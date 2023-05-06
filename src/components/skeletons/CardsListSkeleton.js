import { Flex, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react/dist/chakra-ui-react.cjs"
import Card from "components/card/Card"

const CardsListSkeleton = () => {
    return(
        <SimpleGrid
            mb='20px'
            columns={{ sm: 1, md: 4, '2xl': 4 }}
            spacing={{ base: "20px", xl: "20px" }}
        >
            {Array.from({length: 16}, (_, idx) => (
                <Card
                alignSelf='center'
                w={{ base: "100%", xl: "99%" }}
                h={{base: "100%"}}
                mx='auto'
                p='20px'
                key={`skeleton-card-${idx}`}>
                <Flex direction='column' h='100%' w='100%'>
                    <Stack >
                        <Skeleton height='20px' />                        
                        <Skeleton height='20px' />                        
                        <Skeleton height='20px' />                        
                    </Stack>
                </Flex>
              </Card>
            ))}
          
        </SimpleGrid>
        
    )
}

export default CardsListSkeleton