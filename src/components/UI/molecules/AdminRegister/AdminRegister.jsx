import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  ErrorMessage,
  FormGroup,
  StyledForm,
  StyledWrapper,
  SubmitButton,
  ShowButton,
  StyledShowButtonDiv,
  StyledLoader,
} from './AdminRegister.styled';
import { registerAdmin } from '../../../../api calls/admin';

export default function AdminRegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(event) {
    if (errorMessage) {
      setErrorMessage('');
    }
    if (event.target.id === 'email') {
      setEmail(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    } else if (event.target.id === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);

      return;
    }

    try {
      await registerAdmin(email, password);
      alert('Admin registered successfully');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (error) {
      console.log(error);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('Error registering admin');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>
        <FormGroup>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password:</label>
          <StyledShowButtonDiv>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <ShowButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ShowButton>
          </StyledShowButtonDiv>
        </FormGroup>
        <FormGroup>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {isLoading ? (
          <StyledLoader />
        ) : (
          <SubmitButton type="submit">Register</SubmitButton>
        )}
        <p>
          Already have an account? <Link to="/">Click here to sign-in</Link>
        </p>
      </StyledForm>
    </StyledWrapper>
  );
}
