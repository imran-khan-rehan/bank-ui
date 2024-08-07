
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import SimpleSignin from '../app/login/page';
// import { useRouter } from 'next/navigation';

// // Mock the useRouter hook
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// // Mock the fetch API
// global.fetch = jest.fn();

// describe('SimpleSignin Page', () => {
//   const mockPush = jest.fn();
  
//   beforeEach(() => {
//     // Clear previous mock calls
//     jest.clearAllMocks();
    
//     // Mock the useRouter hook
//     useRouter.mockReturnValue({ push: mockPush });
//   });

//   it('renders email and password fields and sign in button', () => {
//     render(<SimpleSignin />);

//     expect(screen.getByLabelText('Email')).toBeInTheDocument
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument;
//     expect(screen.getAllByText(/Sign In/i)).toBeInTheDocument;
//   })

//   it('makes a login request and redirects on successful login', async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve({ token: 'fake-jwt-token' }),
//     });

//     render(<SimpleSignin />);

//     fireEvent.change(screen.getByLabelText(/Email/i), {
//       target: { value: 'test@test.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: '123456as' },
//     });
    
//     fireEvent.click(screen.getByRole('button'));

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith('http://localhost:8083/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: 'test@test.com', password: '123456as' }),
//       });

//       expect(mockPush).toHaveBeenCalledWith('/user');
//     });
//   });

//   it('handles login failure', async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: false,
//       json: () => Promise.resolve({ message: 'Invalid email or password' }),
//     });

//     render(<SimpleSignin />);

//     fireEvent.change(screen.getByLabelText(/Email/i), {
//       target: { value: 'test@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: 'wrongpassword' },
//     });
    
//     fireEvent.click(screen.getByRole('button'));

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith('http://localhost:8083/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: 'test@example.com', password: 'wrongpassword' }),
//       });

//     //   In this example, we are not checking for specific UI changes on failure.
//     //   You can add assertions to handle failure cases as needed.
//    });
//  });
// });

// __tests__/signin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signin from '../app/login/page';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import '@testing-library/jest-dom';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('Signin Page', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Clear previous mock calls
    jest.clearAllMocks();

    // Mock the useRouter hook
    useRouter.mockReturnValue({ push: mockPush });

    // Mock the useUser context
   // jest.spyOn(useUser, 'useUser').mockReturnValue({ login: mockLogin });
  });

//   it('renders email and password fields and sign-in button', () => {
//     render(<Signin />);

//     expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
//   });

//   it('makes a login request and redirects on successful login', async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve({ response: 'fake-jwt-token', id: '123', role: 'user', accountNumber: 'ACC123' }),
//     });

//     render(<Signin />);

//     fireEvent.change(screen.getByLabelText(/E-mail/i), {
//       target: { value: 'test@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: 'password' },
//     });

//     fireEvent.click(screen.getByText(/Sign in/i));

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
//       });

//       expect(mockPush).toHaveBeenCalledWith('/user');
//     });
//   });

//   it('handles login failure', async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: false,
//       json: () => Promise.resolve({ response: 'User does not exist' }),
//     });

//     render(<Signin />);

//     fireEvent.change(screen.getByLabelText(/E-mail/i), {
//       target: { value: 'test@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: 'wrongpassword' },
//     });

//     fireEvent.click(screen.getByText(/Sign in/i));

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: 'test@example.com', password: 'wrongpassword' }),
//       });

//       expect(screen.getByText(/There is no account on this email/i)).toBeInTheDocument();
//     });
//   });

  it('toggles password visibility', () => {
    render(<Signin />);

    const passwordInput = screen.getByLabelText(/Password/i);
    const toggleButton = screen.getByAltText(/Show Password/i);

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});
