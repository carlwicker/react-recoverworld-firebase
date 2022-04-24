import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ILogin {
  user: any;
  setUser: any;
  isAdmin: any;
  setIsAdmin: any;
}

export default function Login({ user, setUser, isAdmin, setIsAdmin }: ILogin) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();

  onAuthStateChanged(Auth, (currentUser) => {
    setUser(currentUser);
  });

  async function login() {
    const userObj = await signInWithEmailAndPassword(Auth, email, password)
      .then(() => {
        setIsAdmin(true);
        navigate("../");
        console.log(isAdmin);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(isAdmin);
      });
  }

  useEffect(() => {
    console.log(isAdmin, user);
  }, [user, isAdmin]);

  return (
    <Container>
      <h2>Login</h2>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
