import axios from "axios";
import { useState } from "react";
import {Link, Navigate, useLocation } from "react-router-dom";

const Auth: React.FC<any>= ({dispatch}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation()

  const auth = async (
    email: string,
    name: string,
    password: string,
    isLogin: boolean
  ) => {
    if (isLogin) {
      const data = await axios
        .post("/user/login ", {
          email,
          password,
        }).then(({data}) => data)
        console.log(data)
    }
  };
  return (
    <>
      {isLogin ? (
        <div className="auth">
          <h3>Login</h3>
          <input
            value={email}
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => auth(email, name, password, isLogin)}>
            Enter
          </button>
          <span>
            Don`t have account?
            <p onClick={() => setIsLogin(false)}>Registration!</p>
          </span>
        </div>
      ) : (
        <div className="auth">
          {" "}
          <h3>Registration</h3>
          <input
            value={name}
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={email}
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Register</button>
          <span>
            You have account?<p onClick={() => setIsLogin(true)}>Enter!</p>
          </span>
        </div>
      )}
    </>
  );
};

export default Auth;
