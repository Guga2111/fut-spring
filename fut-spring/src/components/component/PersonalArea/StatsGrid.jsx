import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator"; // Útil para separar seções dentro de cards maiores
import { Progress } from "@/components/ui/progress"; // Para barras de progresso
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Para avatares de jogadores
import { Badge } from "@/components/ui/badge"; // Para badges de conquistas
// Importe suas bibliotecas de gráficos (Recharts, Nivo, Chart.js) aqui
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

// Exemplo de dados (você os obterá do seu backend)
const playerData = {
  name: "Gê Alves",
  avatarUrl: "/path/to/player-avatar.jpg", // Substitua pelo caminho real
  overallRating: 8.5,
  stats: {
    totalGoals: 45,
    totalAssists: 22,
    totalGames: 80,
    gamesWon: 55,
    gamesLost: 15,
    gamesDrawn: 10,
    goalTypes: {
      rightFoot: 20,
      leftFoot: 10,
      head: 10,
      penalty: 5,
    },
    attendancePercentage: 90,
    goalsPerMonth: [
      { month: "Jan", goals: 5 },
      { month: "Fev", goals: 3 },
      { month: "Mar", goals: 7 },
      { month: "Abr", goals: 4 },
      { month: "Mai", goals: 6 },
    ],
    lastGamePerformance: {
      goals: 2,
      assists: 1,
      rating: 9.0,
      opponent: "Time Adversário A",
      result: "Vitória",
    },
    achievements: [
      { name: "Artilheiro do Mês", date: "Abril 2024", icon: "⚽" },
      { name: "Mestre de Assistências", date: "Março 2024", icon: "🤝" },
      { name: "Presença Total", date: "Jan - Dez 2023", icon: "✅" },
    ],
  },
};

export default function StatsGrid({ user }) {
  // Cores para os gráficos de pizza (exemplo)
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  console.log("User: ", user);

  if (user === null) {
    return (
      <div>
        <Progress value={progress}></Progress>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[600px] rounded-lg border"
    >
      {/* Painel Esquerdo - Visão Geral e Destaques */}
      <ResizablePanel defaultSize={25} minSize={20}>
        <div className="flex h-full items-start justify-center p-6">
          <Card className="w-full h-full flex flex-col justify-between">
            {" "}
            {/* Ajustar h-full e flex-col */}
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={playerData.avatarUrl} alt={user.username} />
                <AvatarFallback>
                  {user.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <CardDescription>
                <div class="flex items-center">
                  <span class="mr-1">
                    Avaliação Geral: {user.stars.toFixed(1)}
                  </span>
                  <Star class="inline-block align-middle w-4 h-4 text-amber-400 fill-current"></Star>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-around">
              {" "}
              {/* Usar flex-grow */}
              <div>
                <p className="text-lg font-medium">Próxima Pelada:</p>
                <p className="text-muted-foreground">
                  Quinta, 22 de Maio, 9:00 PM
                </p>
                <p className="text-muted-foreground">Local: Ilha do Retiro</p>
              </div>
              <Separator className="my-4" />
              <div>
                <h4 className="text-lg font-medium mb-2">
                  Conquistas Recentes:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {playerData.stats.achievements.map((achievement, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="justify-center py-2 px-3 text-sm"
                    >
                      <span className="mr-2">{achievement.icon}</span>{" "}
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            {/* Opcional: CardFooter para botões de perfil, etc. */}
            {/* <CardFooter>
              <Button className="w-full">Ver Perfil Completo</Button>
            </CardFooter> */}
          </Card>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel Central - Estatísticas Principais (Dividido verticalmente) */}
      <ResizablePanel defaultSize={50} minSize={30}>
        <ResizablePanelGroup direction="vertical">
          {/* Topo - Gols e Assistências (Números Grandes) */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>Estatísticas Chave</CardTitle>
                  <CardDescription>
                    Seus números mais importantes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary">
                      {user.stats.goals}
                    </p>
                    <p className="text-lg text-muted-foreground">Gols Totais</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-accent-foreground">
                      {user.stats.assists}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Assistências
                    </p>
                  </div>

                  <div className="col-span-2 mt-4">
                    <Progress
                      value={
                        (playerData.stats.gamesWon /
                          playerData.stats.totalGames) *
                        100
                      }
                      className="w-full mb-2"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      Taxa de Vitórias:{" "}
                      {(
                        (playerData.stats.gamesWon /
                          playerData.stats.totalGames) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* Base - Gráficos de Evolução e Detalhes */}
          <ResizablePanel defaultSize={70} minSize={40}>
            <div className="flex h-full items-center justify-center p-6">
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>Evolução de Gols Mensal</CardTitle>
                  <CardDescription>
                    Desempenho ao longo do tempo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Gráfico de Linha para Gols Mensais (Exemplo com Recharts) */}
                  {/* Você precisará importar e configurar Recharts */}
                  {/*
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={playerData.stats.goalsPerMonth}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="goals" stroke="#8884d8" name="Gols" />
                    </LineChart>
                  </ResponsiveContainer>
                  */}
                  <div className="flex items-center justify-center h-[250px] bg-muted rounded-md text-sm text-muted-foreground">
                    Placeholder para Gráfico de Linha (Recharts, Nivo, etc.)
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-4"></CardFooter>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel Direito - Detalhes e Comparativos */}
      <ResizablePanel defaultSize={25} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Detalhes das Estatísticas</CardTitle>
              <CardDescription>Aprofunde-se nos seus dados.</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-lg font-medium mb-2">Gols por Tipo:</h4>
              {/* Gráfico de Pizza para Tipos de Gols (Exemplo com Recharts) */}
              {/*
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={Object.entries(playerData.stats.goalTypes).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {
                      Object.keys(playerData.stats.goalTypes).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))
                    }
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              */}
              <div className="flex items-center justify-center h-[200px] bg-muted rounded-md text-sm text-muted-foreground">
                Placeholder para Gráfico de Pizza (Recharts, Nivo, etc.)
              </div>
              <Separator className="my-4" />
              <h4 className="text-lg font-medium mb-2">Presença em Jogos:</h4>
              <Progress
                value={playerData.stats.attendancePercentage}
                className="w-full mb-2"
              />
              <p className="text-sm text-muted-foreground text-center">
                {playerData.stats.attendancePercentage}% de comparecimento
              </p>
              {/* Adicionar mais estatísticas ou gráficos menores aqui, se desejar */}
            </CardContent>
          </Card>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
