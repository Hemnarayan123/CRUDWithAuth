// import React, { useState } from 'react';
// import axios from 'axios';


// const OTPVerification = ({ email }) => {
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/password/verify_otp', { email, otp },{
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setMessage(response.data.message);
//       if (data.token) {
//         history.push(`/reset_password/${data.token}`);
//       }
//     } catch (error) {
//       setMessage('Failed to verify OTP.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//     <h2>Verify OTP</h2>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         required
//       />
//       <button type="submit">Verify OTP</button>
//     </form>
//     {message && <p>{message}</p>}
//   </div>
//   );
// };

// export default OTPVerification;
