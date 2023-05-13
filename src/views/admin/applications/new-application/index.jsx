import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from "@chakra-ui/react"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import useApplication from "services/hooks/application.hooks"
import { showErrorToast, showSuccessToast } from "utils/toasts"

const NewApplication = () => {
    const history = useHistory()

    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({});
    const {createApplication, getApplication} = useApplication()

    const location = useLocation()

    const {isEdit, applicationId} = location.state 

    useEffect(() => {
      const fetchApp = async () => {

        if(isEdit){
          //fetch app data and fill the form fields
          const response = await getApplication(applicationId)

          if(isAxiosError(response)){
            showErrorToast('An error occurred while fetching application data')
            return
          }

          
          setFormData(response)
        }
      }
      fetchApp()
    },[])

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Perform form validation
        const validationErrors = validateForm(formData);

        if (!Object.keys(validationErrors).length) {
          // Form submission logic here

            delete formData.confirmPassword
            const response = await createApplication(formData)

            if(isAxiosError(response)){
              const errPayload = response.response.data.data
              const errorMessages = typeof(errPayload) === 'string' ? errPayload : Object.values(errPayload).toString()
              
              showErrorToast(errorMessages)
              
            } else {
              showSuccessToast(response.data.message || 'Application created successfully')
            }
            resetFields()
            history.goBack()
          } else {
            setErrors(validationErrors);
          }
      };

      const resetFields = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: '',
          description: ''
        }));
        setErrors({});
      };

      const validateForm = (data) => {

        if(!data.name){
            errors.name = 'Application name not valid'
        }
        
        if(!data.description){
            errors.description = 'Application description not valid'
            
        }

        if(!data.roles.length){
            errors.roles = 'Please, select at least one role'
        }

        return errors
      }

    return(
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Stack justifyContent={'center'} direction={'column'} spacing={10}>
            <Heading as='h1' size='2xl' noOfLines={1} textAlign={'center'}>
                {isEdit ? 'Edit' : 'Add new'} Application
            </Heading>
            <Flex justify={'center'}>
            <form onSubmit={handleSubmit} noValidate>
                <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' name='name' value={formData.name} onChange={handleChange} />
                    {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Input type='text' name='description' value={formData.description} onChange={handleChange} />
                    {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.roles}>
                    <FormLabel>Roles</FormLabel>
                    <Select placeholder={`Select roles`}>
                        {formData.roles ? formData.roles.map((role, idx) => (
                            <option key={`role-${idx}`} value={role}>{role}</option>
                        )) : null}
                    </Select>
                    {errors.roles && <FormErrorMessage>{errors.roles}</FormErrorMessage>}
                </FormControl>                
                    <Button type='submit'>
                        Create Application
                    </Button>
                    <Button onClick={resetFields}>
                        Reset
                    </Button>
            </form>
            </Flex>
        </Stack>
    </Box>
    )
}

export default NewApplication