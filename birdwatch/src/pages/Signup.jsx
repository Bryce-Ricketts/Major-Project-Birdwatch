import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        setMessage("Account created successfully!");
        navigate("/login");
    }

    return (
        <div id="signup-master">
            <h1>Sign up below:</h1>

            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Sign-up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;