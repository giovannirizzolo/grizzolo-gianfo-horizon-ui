import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'services/costants';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    console.log('apiError :>> ', apiError);
  }, [apiError])
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('calling :>> ');
        const response = await axios.get(`${baseUrl}/users`);
        setUsers(response.data.data);
        setApiError(null);
      } catch (apiError) {
        setApiError(apiError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createUser = async (userData) => {
    try {
      console.log('userData :>> ', userData);
      const response = await axios.post(`${baseUrl}/users`, userData);
      setApiError(null);
      return response.data
    } catch (error) {
      console.log('error :>> ', error);
      console.log('error.response.data.data :>> ', error.response.data.data);
      // setApiError(error.response.data.data);
      return error
    }
  };

  const getUser = async (userId) => {
    try{
        const response = await axios.get(`${baseUrl}/users/${userId}`)
        if(response.status > 200 && response.status < 300){
            setApiError(null)
        }
        return response.data
    }catch(error){
        setApiError(error)
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`${baseUrl}/users/${updatedUser.id}`, updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setApiError(null);
    } catch (error) {
      setApiError(error);
    }
  };

  const removeUser = async (userId) => {
    try {
      await axios.delete(`${baseUrl}/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setApiError(null);
    } catch (error) {
      setApiError(error);
    }
  };

  return { users, loading, apiError, createUser, getUser, updateUser, removeUser };
};

export default useUser;
