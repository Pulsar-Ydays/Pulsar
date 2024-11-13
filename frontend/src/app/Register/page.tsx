"use client";

import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import AuthButton from "@/components/AuthButton";
import LoginForm from "@/components/LoginForm"

function Register() {
  const [isSignUp, setIsSignUp] = useState(false); 

  return (
    <div className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center">
      <div className={`container mx-auto p-12 ${isSignUp ? "right-panel-active" : ""}`}>
        <div className="flex justify-between mb-4">
          <AuthButton
            isActive={!isSignUp} 
            onClick={() => setIsSignUp(false)}
            label="Sign In"
          />
          <AuthButton
            isActive={isSignUp}
            onClick={() => setIsSignUp(true)} 
            label="Sign Up"
          />
        </div>
        <div className={`form-container ${isSignUp ? "right-panel-active" : ""}`}>
          {isSignUp ? <RegisterForm /> : <div>Formulaire de Inscription ici</div>}
        </div>
        <div className={`form-container ${!isSignUp ? "right-panel-active" : ""}`}>
          {!isSignUp ? <LoginForm /> : <div>Formulaire de connexion ici</div>}
        </div>
      </div>
    </div>
  );
}

export default Register;
