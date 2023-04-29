import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'services/costants';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/users`);
        setUsers(response.data.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(`${baseUrl}/users`, newUser);
      setError(null);
      return response.data
    } catch (error) {
      setError(error);
    }
  };

  const getUser = async (userId) => {
    try{
        const response = await axios.get(`${baseUrl}/users/${userId}`)
        if(response.status > 200 && response.status < 300){
            setError(null)
        }
        return response.data
    }catch(error){
        setError(error)
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`${baseUrl}/users/${updatedUser.id}`, updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const removeUser = async (userId) => {
    try {
      await axios.delete(`${baseUrl}/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  return { users, loading, error, createUser, getUser, updateUser, removeUser };
};

export default useUser;
