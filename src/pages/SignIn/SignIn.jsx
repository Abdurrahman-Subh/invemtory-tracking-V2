import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styled from "styled-components";
import BackGround from "../../Utility/backgroundColor.jpg";
import "./signin.css";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  background-image: url(${BackGround});
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 100vw;
    height: 100vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 100vw;
    height: 100vh;
  }
`;
const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;
// const WelcomeText = styled.h2`
//   margin: 3rem 0 2rem 0;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: 30%;
//   width: 30%;
// `;

// const ButtonContainer = styled.div`
//   margin: 1rem 0 2rem 0;
//   width: 30%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ForgotPassword = styled.h4`
//   cursor: pointer;
// `;
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MainContainer>
      <div class="login-box">
        <h3>Giriş Formu</h3>
        <form>
          <label>E-Posta</label>
          <div class="user-box">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Şifre</label>
          <div class="user-box">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>{error}</p>
          <a href="#" onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Giriş Yap
          </a>
        </form>
      </div>
    </MainContainer>
  );
};

export default SignIn;
