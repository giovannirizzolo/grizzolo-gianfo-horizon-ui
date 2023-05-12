import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from "@chakra-ui/react"
import { isAxiosError } from "axios"
import { useState } from "react"
import useApplication from "services/hooks/application.hooks"
import { showErrorToast, showSuccessToast } from "utils/toasts"

const NewApplication = () => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({});
    const {createApplication} = useApplication()

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

        console.log('validationErrors :>> ', validationErrors);

        if (!Object.keys(validationErrors).length) {
          // Form submission logic here

            delete formData.confirmPassword
            const response = await createApplication(formData)

            if(isAxiosError(response)){
              const errPayload = response.response.data.data
              const errorMessages = typeof(errPayload) === 'string' ? errPayload : Object.values(errPayload).toString()
              
              showErrorToast(errorMessages)
              
            } else {
              showSuccessToast('Application created successfully')
            }
            resetFields()
          } else {
            setErrors(validationErrors);
          }
      };

      const resetFields = () => {
        setFormData({
          name: '',
          description: '',
          roles: [],
        });
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
                Add new Application
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
                        {/* {roles.map((role, idx) => (
                            <option key={`role-${idx}`} value={role.name}>{role.name}</option>
                        )) } */}

                    
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