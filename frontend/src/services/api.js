import axios from 'axios';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8000/api/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const processData = async (instruction, replacement, data) => {
  const response = await axios.post('http://localhost:8000/api/process/', {
    instruction,
    replacement,
    data,
  });
  return response.data;
};
