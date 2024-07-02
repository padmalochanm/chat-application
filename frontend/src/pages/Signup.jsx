import { useState } from 'react';
import { FormControl, FormLabel, Input, RadioGroup, Radio, HStack } from "@chakra-ui/react";
import useSignup from '../hooks/useSignup';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Male' // Set a default value for gender
  });
  const { signup, loading } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="w-full p-6 rounded-lg shadow-md bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5"
      >
        <h1 className="text-3xl font-semibold text-center text-yellow-200">
          Signup <span className="text-green-500">Chat-App</span>
        </h1>
        <div className="text-gray-100">
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">Name</FormLabel>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full h-10 text-white" 
            />
          </FormControl>
        </div>
        <div className="text-gray-100">
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">Email address</FormLabel>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full h-10 text-white" 
            />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">Password</FormLabel>
            <Input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full h-10 text-white" 
            />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">Confirm Password</FormLabel>
            <Input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full h-10 text-white" 
            />
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl as="fieldset" className="label p-2 label-text text-gray-100">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup 
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
            >
              <HStack spacing="24px">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <a href="/login" className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block">
            Already have an account?
          </a>
        </div>
        <div>
          <button 
            type="submit" 
            className="btn btn-active btn-accent btn-block btn-sm mt-2" 
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
