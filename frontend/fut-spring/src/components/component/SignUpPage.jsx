import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function SignUpPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    stars: 1,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    const endpoint = `${API_BASE_URL}/user/register`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseData(response.data);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error in the registration request:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    const endpoint = `${API_BASE_URL}/authenticate`;

    try {
      const response = await axios.post(endpoint, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const authHeader = response.headers["authorization"];
      console.log("Authorization Header:", authHeader);

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        localStorage.setItem("jwt_token", token);
        onLogin(token);
        navigate("/home");
      } else {
        console.error("JWT token not found in Authorization header.");
        alert("Login failed. Token not received. Please try again.");
      }
    } catch (error) {
      console.error("Error in the login request:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-0">
            <TabsTrigger
              value="register"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-background data-[state=active]:!text-foreground data-[state=active]:!shadow-sm
                         data-[state=active]:!border-b-2 data-[state=active]:border-green-500
                         data-[state=active]:!text-green-600
                         data-[state=inactive]:!text-gray-500
                         data-[state=inactive]:!bg-transparent"
            >
              Register
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-background data-[state=active]:!text-foreground data-[state=active]:!shadow-sm
                         data-[state=active]:!border-b-2 data-[state=active]:border-green-500
                         data-[state=active]:!text-green-600
                         data-[state=inactive]:!text-gray-500
                         data-[state=inactive]:!bg-transparent"
            >
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account by filling out the form below.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegisterRequest}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="username">Name</Label>
                    <Input
                      required
                      name="username"
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      required
                      name="email"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      required
                      name="password"
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                    />
                  </div>
                </CardContent>
                <CardFooter className="mt-6">
                  <Button
                    type="submit"
                    className="w-full !bg-green-600 !text-white hover:!bg-green-700"
                  >
                    Create Account
                  </Button>
                </CardFooter>
              </form>
              {responseData && (
                <div className="response-container p-4">
                  <h3>Server Response:</h3>
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Access your account by entering your credentials below.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginRequest}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input
                      required
                      name="email"
                      id="loginEmail"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      required
                      name="password"
                      id="loginPassword"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                    />
                  </div>
                </CardContent>
                <CardFooter className="mt-6">
                  <Button className="w-full !bg-green-600 !text-white hover:!bg-green-700">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-6 text-center text-sm text-gray-600">
          Connect with local players • Organize matches • Track your games
        </div>
      </div>
    </div>
  );
}