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
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function SignUpPage({ onLogin }) {

  const [searchParams] = useSearchParams();

  const defaultTab = searchParams.get('tab') === 'login' ? 'login' : 'register';

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

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

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
        <div className="text-center mb-8">
          <img
            src="/gerrard-kissing.jfif"
            alt="Soccer illustration"
            className="h-40 w-40 mx-auto drop-shadow-lg rounded-full object-cover"
          />
          <h1 className="text-5xl font-bold mt-4 text-gray-800 tracking-tight">
            Futspring
          </h1>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="
          w-full max-w-[720px]
          !flex items-center gap-0
          !bg-muted 
          divide-x divide-muted-foreground/10
        ">
<TabsTrigger
        value="register"
        className="
          flex-1 !rounded-r-none !rounded-l-md
          data-[state=inactive]:!bg-muted data-[state=inactive]:!text-muted-foreground
          data-[state=active]:!bg-background data-[state=active]:!text-foreground data-[state=active]:!shadow-sm
        "
      >
              Register
            </TabsTrigger>
            <TabsTrigger
        value="login"
        className="
          flex-1 !rounded-l-none !rounded-r-md
          data-[state=inactive]:!bg-muted data-[state=inactive]:!text-muted-foreground
          data-[state=active]:!bg-background data-[state=active]:!text-foreground data-[state=active]:!shadow-sm
        "
      >
              Login
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="register">
            {/* MUDANÇA 3: Card com borda superior zerada para garantir a conexão */}
            <Card className="!rounded-t-none !border-t-0">
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account by filling out the form below.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegisterRequest}>
                {/* ... SEU FORMULÁRIO ... */}
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
                    <div className="relative">
                      <Input
                        required
                        name="password"
                        id="password"
                        type={showRegisterPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a secure password"
                        className="pr-10"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </span>
                    </div>
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
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card className="!rounded-t-none !border-t-0">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Access your account by entering your credentials below.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginRequest}>
                {/* ... SEU FORMULÁRIO ... */}
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
                    <div className="relative">
                      <Input
                        required
                        name="password"
                        id="loginPassword"
                        type={showLoginPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        className="pr-10"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </span>
                    </div>
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