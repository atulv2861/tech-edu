import React, { useRef } from 'react';
import './EmailInputModal.css';

const EmailInputModal = ({setEmail}) => {
  const emailRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!emailRef?.current?.value){
      alert('Please enter your email address')
      return
    }
    setEmail(emailRef.current.value)
  };

  return (
    <div className="email-modal">
      <div className="email-modal-content">
        <h2>Enter Your Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            ref={emailRef}
            required
          />
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmailInputModal;
