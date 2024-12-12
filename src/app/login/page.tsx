"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../api";
import { ACCESS_TOKEN } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css"
import Image from "next/image";
import logo from "../../../public/dtcc-logo.png"
import axios from "axios";
import Head from "next/head";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {login, isAuthorized} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/react/accounts/login/", { 
        username,
        password
      });

      console.log(response);
      if (response.status === 200) {
        login(response.data.data.token)
        router.push("/");
      } 

    } catch (err) {
    
      if (axios.isAxiosError(err)) {
        // Now TypeScript knows 'err' is an AxiosError
        if (err.response && err.response.status === 401) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        // err is some other type of error (e.g., network error, runtime error)
        setError("No response from server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthorized) {
      // Redirect authenticated users to the main page
      router.push("/");
    }
  }, [isAuthorized, router]);
  return (
    <div>
      {!isAuthorized &&
      (<div className={styles.container}>
        <div>
          <Image src={logo} alt="testing" width={500}/>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>)}
    </div>
  );
};

export default LoginPage;

