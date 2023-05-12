import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from 'services/costants';
import { showSuccessToast } from "utils/toasts";
import { showErrorToast } from "utils/toasts";

const useRoles = () => {
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles()

            if(isAxiosError(response)){
                showErrorToast('An error occurred while fetching roles')
                return
            }
            
            setRoles(response.data)
            showSuccessToast('Roles fetched successfully')
        }

        fetchRoles()
    }, [])

    const getRoles = async () => {
        try{
            const response = await axios.get(`${baseUrl}/roles`)
            return response.data
        }catch(error){
            return error
        }
    }

    return {getRoles}
}

export default useRoles;