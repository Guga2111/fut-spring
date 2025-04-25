import { Button } from "@/components/ui/button"
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUpPage() {
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
    const { name, value } =e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8080/user/register";

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
      console.error("Error in the request: " + error);
    }
  };

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8080/authenticate";
  
    try {
      // Faz a requisição ao backend
      const response = await axios.post(endpoint, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Verifica se o cabeçalho Authorization está presente
      const authHeader = response.headers["authorization"];
      console.log("Cabeçalho Authorization:", authHeader); // Log para depuração

      if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        localStorage.setItem("jwt", token);
        navigate("/");
      } else {
        console.error("Token JWT não encontrado no cabeçalho Authorization.");
        alert("Erro ao processar o login. Tente novamente.");
      }
      
    } catch (error) {
      console.error("Erro na requisição de login: ", error);
      alert("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="shadow-none mx-auto flex justify-center items-center">
        <Tabs defaultValue="register" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
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
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Name</Label>
                <Input
                  required
                  name="username"
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Create Account</Button>
            </CardFooter>
          </form>
          {responseData && (
            <div className="response-container">
              <h3>Resposta do Servidor:</h3>
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input required name="email" id="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter your email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input required name="password" id="password" type="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    
  );
}