import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'services/costants';


const useApplication = (applicationId) => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
        try {
          const response = await axios.get(`${baseUrl}/apps`);
          
          setApplications(response.data.data);
          setError(null);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
    };

    getApplications()
  }, []);
  
  const getApplication = async (applicationId) => {
    try {
      const response = await axios.get(`${baseUrl}/apps/${applicationId}`);
      return response.data
    } catch (error) {
      setError(error);
    }
  };
  

  const createApplication = async (newApp) => {
    try {
      const response = await axios.post(`${baseUrl}/apps`, newApp);
      if(response.status >= 200 && response.status < 300){
        setError(null)
      }
      return response.data
    } catch (error) {
      setError(error);
    }
  };

  const updateApplication = async (updatedApplication) => {
    try {
      const response = await axios.put(`${baseUrl}/apps/${applicationId}`, updatedApplication);
      if(response.status >= 200 && response.status < 300){
          setError(null);
      }
      return response.data
    } catch (error) {
      setError(error);
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      const response = await axios.delete(`${baseUrl}/apps/${applicationId}`);
      if(response.status >= 200 && response.status < 300){
        setError(false);
        setApplications((prevApplications) => prevApplications.filter((app) => app.id !== applicationId))
        
      }
    return response.data
    } catch (error) {
      setError(error);
    }
  };

  return { applications, loading, error, getApplication, updateApplication, deleteApplication, createApplication };
};

export default useApplication;
