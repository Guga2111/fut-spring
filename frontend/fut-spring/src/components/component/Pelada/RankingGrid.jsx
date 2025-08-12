  import React from 'react';
  import { Card, CardContent } from '@/components/ui/card';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { Badge } from '@/components/ui/badge';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Trophy, Target, Zap } from 'lucide-react';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  export default function RankingGrid({ ranking, associatedPlayers, allImages = [] }) {
    const [tab, setTab] = React.useState('general');

    const mapEntries = (type) =>
      (ranking.prizes || [])
        .filter((entry) => entry.typeOfPrize === type)
        .map((entry) => ({
          ...entry,
          user:
            associatedPlayers.find((p) => p.id === entry.userId) || {
              id: entry.userId,
              username: 'Player',
              image: '',
            },
        }))
        .sort((a, b) => a.position - b.position);

    const goalsPrizes = mapEntries('TOPSCORER');
    const assistsPrizes = mapEntries('TOPASSIST');
    const puskasPrizes = mapEntries('PUSKAS');

    const getImageSrc = (filename) => {
      if (!filename) return '/placeholder.svg';
      const exists = Array.isArray(allImages) && allImages.includes(filename);
      return exists ? `${API_BASE_URL}/user/images/${filename}` : '/placeholder.svg';
    };

    const formatDate = (date) => (date ? new Date(date).toLocaleDateString('pt-BR') : '-');

    const getPositionIcon = (position) => {
      if (position <= 3) {
        return (
          <Trophy
            className={`w-5 h-5 ${
              position === 1 ? 'text-gold' : position === 2 ? 'text-silver' : 'text-bronze'
            }`}
          />
        );
      }
      return <span className="text-muted-foreground font-bold">#{position}</span>;
    };

    const TabIcon = ({ type }) => {
      switch (type) {
        case 'goals':
          return <Target className="w-4 h-4" />;
        case 'assists':
          return <Zap className="w-4 h-4" />;
        case 'puskas':
          return <Trophy className="w-4 h-4" />;
        default:
          return <Trophy className="w-4 h-4" />;
      }
    };

    const RankingList = ({ prizes, title, valueLabel }) => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center text-emerald-600">{title}</h3>
        {prizes.length === 0 ? (
          <Card className="!bg-white !border !shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No results found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {prizes.map((prize) => (
              <Card
                key={prize.id}
                className={`
                  !bg-white !border !shadow-sm hover:!shadow-md transition-all duration-200 !rounded-xl
                  ${prize.position <= 3 ? '!ring-2 !ring-offset-2' : ''}
                  ${prize.position === 1 ? 'ring-gold/30' : ''}
                  ${prize.position === 2 ? 'ring-silver/30' : ''}
                  ${prize.position === 3 ? 'ring-bronze/30' : ''}
                `}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                        {getPositionIcon(prize.position)}
                      </div>
                      <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                        <AvatarImage src={getImageSrc(prize.user?.image)} alt={prize.user?.username} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {prize.user?.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{prize.user?.username}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(prize.date)}</p>
                      </div>
                    </div>

                    <Badge
                      variant={prize.position <= 3 ? 'default' : 'secondary'}
                      className={`
                        !rounded-full !px-3 !py-1
                        ${prize.position === 1 ? '!bg-gold !text-gold-foreground' : ''}
                        ${prize.position === 2 ? '!bg-silver !text-silver-foreground' : ''}
                        ${prize.position === 3 ? '!bg-bronze !text-bronze-foreground' : ''}
                      `}
                    >
                      {prize.value} {valueLabel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <Card className="w-full flex-col h-full mx-auto !shadow-sm">
        <CardContent className="!p-4 sm:!p-6">
          <div className="mb-4 sm:mb-6 text-center">
            <h2 className="text-sm sm:text-base font-medium text-muted-foreground">
              Pelada Prizes 
            </h2>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
    <div className="w-full flex justify-center mb-6">
      <TabsList
        className="
          w-full max-w-[720px]
          !flex items-center gap-0
          !bg-muted !rounded-md overflow-hidden
          divide-x divide-muted-foreground/10
        "
      >
        <TabsTrigger
          value="general"
          className="
            !flex-1 flex items-center justify-center gap-2
            !px-3 sm:!px-4 !py-2 !rounded-none
            !bg-transparent hover:!bg-muted/60 !text-muted-foreground
            data-[state=inactive]:!shadow-none data-[state=inactive]:!border-0
            data-[state=active]:!bg-white data-[state=active]:!text-emerald-600
            data-[state=active]:!shadow-none data-[state=active]:!border-0
          "
        >
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">Geral</span>
        </TabsTrigger>

        <TabsTrigger
          value="goals"
          className="
            !flex-1 flex items-center justify-center gap-2
            !px-3 sm:!px-4 !py-2 !rounded-none
            !bg-transparent hover:!bg-muted/60 !text-muted-foreground
            data-[state=inactive]:!shadow-none data-[state=inactive]:!border-0
            data-[state=active]:!bg-white data-[state=active]:!text-emerald-600
            data-[state=active]:!shadow-none data-[state=active]:!border-0
          "
        >
          <TabIcon type="goals" />
          <span className="hidden sm:inline">Gols</span>
        </TabsTrigger>

        <TabsTrigger
          value="assists"
          className="
            !flex-1 flex items-center justify-center gap-2
            !px-3 sm:!px-4 !py-2 !rounded-none
            !bg-transparent hover:!bg-muted/60 !text-muted-foreground
            data-[state=inactive]:!shadow-none data-[state=inactive]:!border-0
            data-[state=active]:!bg-white data-[state=active]:!text-emerald-600
            data-[state=active]:!shadow-none data-[state=active]:!border-0
          "
        >
          <TabIcon type="assists" />
          <span className="hidden sm:inline">Assistências</span>
        </TabsTrigger>

        <TabsTrigger
          value="puskas"
          className="
            !flex-1 flex items-center justify-center gap-2
            !px-3 sm:!px-4 !py-2 !rounded-none
            !bg-transparent hover:!bg-muted/60 !text-muted-foreground
            data-[state=inactive]:!shadow-none data-[state=inactive]:!border-0
            data-[state=active]:!bg-white data-[state=active]:!text-emerald-600
            data-[state=active]:!shadow-none data-[state=active]:!border-0
          "
        >
          <TabIcon type="puskas" />
          <span className="hidden sm:inline">Puskas</span>
        </TabsTrigger>
      </TabsList>
    </div>

            <TabsContent value="general" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RankingList prizes={goalsPrizes.slice(0, 3)} title="Top Goalscorers" valueLabel="gols" />
                <RankingList prizes={assistsPrizes.slice(0, 3)} title="Top Assists" valueLabel="assists" />
                <RankingList prizes={puskasPrizes.slice(0, 3)} title="Top Puskas" valueLabel="pts" />
              </div>
            </TabsContent>

            <TabsContent value="goals">
              <RankingList prizes={goalsPrizes} title="Ranking of Goals" valueLabel="goals" />
            </TabsContent>

            <TabsContent value="assists">
              <RankingList prizes={assistsPrizes} title="Ranking of Assists" valueLabel="assists" />
            </TabsContent>

            <TabsContent value="puskas">
              <RankingList prizes={puskasPrizes} title="Ranking Puskas" valueLabel="points" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }