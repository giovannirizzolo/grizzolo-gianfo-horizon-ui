import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, border } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";


const Pagination = (props) => {

    const {page, total_pages} = props

    const firstElement = 1
    const lastElement = total_pages
    const middleItemsNum = 5
    const firstOfMiddleItems = 4
    const lastOfMiddleItems = firstOfMiddleItems + middleItemsNum > 0

    const [currPage, setCurrPage] = useState(1)
    

    // useEffect(() => {
    //     
    // }, [currPage])

    const isActive = (idx) => {
        return idx === currPage
    }


    const prevPage = () => {
        setCurrPage((prevPage) => prevPage -= 1)
    }

    const nextPage = () => {
        setCurrPage((prevPage) => prevPage += 1)
    }

    const shouldSeeFirstAndLast = total_pages > 1

    const shouldSeeThreeDotsLeft = total_pages > 2 && middleItemsNum - firstElement 

    const shouldSeeThreeDotsRight = total_pages > 2 && middleItemsNum

    return(
        <Flex gap={1}>
        <IconButton icon={<ChevronLeftIcon />} onClick={prevPage}/>
        {
            shouldSeeFirstAndLast ? <Button isActive={isActive(firstElement)} _active={{
                border: '1px solid white'
            }}>
                {firstElement}
            </Button> : null
        }
        {   
        shouldSeeThreeDotsLeft ?
            <IconButton icon={<FaBeer/>} disabled/>
            : null
        }
        {Array.from({length: middleItemsNum}, (_, idx) => 
            (
                <Button 
                onClick={setCurrPage(idx+1)}
                isActive={isActive(idx+1)} 
                _active={{
                    border: '1px solid white'
                }} >
                {idx+1}
            </Button>
            )
        )}
        {   
        shouldSeeThreeDotsRight ?
            <IconButton icon={<FaBeer/>} disabled/>
            : null
        }
        {
            shouldSeeFirstAndLast ? <Button isActive={isActive(total_pages)} 
            _active={{
                border: '1px solid white'
            }}>
                {lastElement}
            </Button> : null
        }
        <IconButton icon={<ChevronRightIcon />} onClick={nextPage}/>
        </Flex>
    )
}

export default Pagination