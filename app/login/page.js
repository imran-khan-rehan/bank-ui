// pages/signin.js
'use client';

import React, { useState, useContext } from 'react';
import eyeImage from '@/public/icons/eye-slash.svg';
import eyeSlash from '@/public/icons/eye-slash.svg';
import Submitbutton from '@/components/submitbutton';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import HomeNavBar from '@/components/HomeNavBar';
import { useRouter } from 'next/navigation';
export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidCred, setValidCred] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('Incorrect email or password. Please try again.');
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const { login } = useUser();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidCred(true);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidCred(true);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setValidCred(false);
      setIsLoading(false);
      setMessage("wrong Email")
    }

    else if (email && password) {
      setIsLoading(true);
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const { response: token, id, role, accountNumber } = data;
          alert(accountNumber);
          login({ email, token, id, accountNumber });

          const setCookieResponse = await fetch('/api/auth/set-cookies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token, role }),
          });

          if (setCookieResponse.ok) {
            router.push('/user');
          } else {
            setMessage('Failed to set cookies');
          }
        } else {
          setValidCred(false);
          const message = await response.json();
          if (message.response === "User does not exist") {
            setMessage('There is no account on this email');
          } else if (message.response === "password is wrong") {
            setMessage('Wrong password');
          }
        }
      } catch (error) {
        setMessage('Something went wrong');
        alert("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      setValidCred(false)
      setMessage("Email or password cant be empty");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='w-screen flex flex-col'>
      <HomeNavBar />
      <div className='custom h-screen flex justify-center items-center'>
        <div className="w-[500px] p-20 bg-white relative bg-opacity-20 backdrop-filter backdrop-blur-[200px] border border-gray-300 rounded-md shadow-md max-md:pt-20 max-md:pb-20 max-md:pl-10 max-md:pr-10 max-md:w-80">
          <div className="text-3xl font-bold leading-9 text-center">Sign in</div>
          <div className="text-black text-xs font-normal leading-0 mt-3 text-center">
            Dont have an account?
            <Link href="/signup"><div className="ml-1 underline text-yellow-500">Sign up</div></Link>
          </div>
          <div className="mb-2 mt-7 font-poppins">
            <div className="flex justify-between">
              <label className="text-black block font-medium text-base">E-mail</label>
            </div>
            <input
              type="email"
              placeholder='name@email.com'
              value={email}
              onChange={handleEmailChange}
              className="border border-solid border-yellow-500 w-full p-2 rounded-xl text-sm font-normal"
            />
          </div>
          <div className="font-poppins mb-2">
            <label className="text-black block font-medium text-base">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder='enter your password'
                onChange={handlePasswordChange}
                className="border border-solid border-yellow-500 w-full p-2 pr-10 rounded-xl text-sm font-normal"
              />
              <Image
                style={{ width: 'auto', height: '45%' }}
                src={showPassword ? eyeSlash.src : eyeImage.src}
                width={18}
                height={28}
                alt="Show Password"
                className={`absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer ${showPassword ? 'text-black' : ''} ${password.length >= 1 ? 'block' : 'hidden'}`}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className='h-11'>
            <div className={`bg-red-200 p-2 rounded-xl text-red-700 font-medium text-base ${isValidCred ? 'hidden' : 'flex'}`}>
              {message}
            </div>
          </div>
          <Submitbutton message='Sign in' handleSignIn={handleSignIn} />
          {isLoading && <div>Loading ...</div>}
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SimpleSignin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8083/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data); // You can handle token storage or other logic here
//         router.push('/user');
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
//         <form onSubmit={handleSignIn}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
