import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useHistory, useLocation } from "react-router-dom";
import useUser from "services/hooks/user.hooks";
import { formatISODate } from "utils/dates";
import { showErrorToast, showSuccessToast } from "utils/toasts";

const NewUser = () => {
  
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({});

    const history = useHistory()
    const location = useLocation()
    const {isEdit, userId} = location.state

    const {getUser, createUser} = useUser()

    useEffect(() => {
      const fetchUser = async () => {

        
        if(isEdit){
          //fetch user data and fill the form fields
          const response = await getUser(userId)

          if(isAxiosError(response)){
            showErrorToast('An error occurred while fetching user data')
            return
          }

          
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: response.email,
            username: response.username
          }))
        }

      }
      fetchUser()
    },[])


    const handleDateChange = (birthDate) => { 
      setFormData((prevState) => {
        return {...prevState, birthdate: formatISODate(birthDate)}
      })
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Perform form validation
        const validationErrors = validateForm(formData);

        if (!Object.keys(validationErrors).length) {
          // Form submission logic here

            delete formData.confirmPassword
            const response = await createUser(formData)

            if(isAxiosError(response)){
              const errPayload = response.response.data.data
              const errorMessages = typeof(errPayload) === 'string' ? errPayload : Object.values(errPayload).toString()
              
              showErrorToast(errorMessages)
              
            } else {
              showSuccessToast('User created successfully')
            }
            resetFields()
            history.goBack()
          } else {
            setErrors(validationErrors);
          }
      };

      const resetFields = () => {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          firstname: '',
          lastname: '',
          birthdate: '',
        });
        setErrors({});
      };

      const validateForm = (data) => {
        const errors = {};
    
        if(data.password !== data.confirmPassword){
          errors.confirmPassword = 'Passwords does not match';
        }

        if (!data.username) {
          errors.username = 'Username is required';
        }
        if (!data.firstname) {
          errors.firstname = 'First name is required';
        }
        if (!data.lastname) {
          errors.lastname = 'Last name is required';
        }
    
        if (!data.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
          errors.email = 'Email is invalid';
        }
    
        if (!data.password) {
          errors.password = 'Password is required';
        }


        if (!data.birthdate) {
          errors.birthdate = 'Birth date is required';
        }
    
        return errors
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
      
      
    
      
    return(
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Stack justifyContent={'center'} direction={'column'} spacing={10}>
            <Heading as='h1' size='2xl' noOfLines={1} textAlign={'center'}>
                {isEdit ? 'Edit' : 'Add new'} User
            </Heading>
            <Flex justify={'center'}>
            <form onSubmit={handleSubmit} noValidate>
                <FormControl isInvalid={errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' name='username' value={formData.username} onChange={handleChange} />
                    {errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' name='email' value={formData.email} onChange={handleChange} />
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' name='password' value={formData.password} onChange={handleChange} />
                    {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.firstname}>
                    <FormLabel>First Name</FormLabel>
                    <Input type='name' name='firstname' value={formData.firstname} onChange={handleChange} />
                    {errors.firstname && <FormErrorMessage>{errors.firstname}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.lastname}>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='surname' name='lastname' value={formData.lastname} onChange={handleChange}/>
                    {errors.lastname && <FormErrorMessage>{errors.lastname}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.birthdate}>
                    <FormLabel>Birth Date</FormLabel>
                    <Calendar  
                      onChange={(e) => handleDateChange(e)}
                      maxDate={new Date()}/>
                    {errors.birthdate && <FormErrorMessage>{errors.birthdate}</FormErrorMessage>}
                </FormControl>
                    <Button type='submit' name="submit">
                        Create User
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

export default NewUser