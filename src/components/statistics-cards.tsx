import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Clock, AlertCircle } from "lucide-react";
import { useEstatisticas } from "@/hooks/useEstatisticas";
import { Skeleton } from "@/components/ui/skeleton";

export function StatisticsCards() {
  const { data: estatisticas, isLoading, error } = useEstatisticas();

  const statisticsData = [
    {
      title: "Atendimentos do Mês",
      value: estatisticas?.data?.atendimentos_mes?.toString() || "0",
      icon: Users,
      iconColor: "text-info",
      valueColor: "text-info"
    },
    {
      title: "Processos em Andamento",
      value: estatisticas?.data?.processos_andamento?.toString() || "0",
      icon: FileText,
      iconColor: "text-primary",
      valueColor: "text-primary"
    },
    {
      title: "Agendamentos Hoje",
      value: estatisticas?.data?.agendamentos_hoje?.toString() || "0",
      icon: Calendar,
      iconColor: "text-success",
      valueColor: "text-success"
    },
    {
      title: "Casos Novos",
      value: estatisticas?.data?.casos_novos?.toString() || "0",
      icon: Clock,
      iconColor: "text-warning",
      valueColor: "text-warning"
    },
    {
      title: "Total de Clientes",
      value: estatisticas?.data?.total_clientes?.toString() || "0",
      icon: AlertCircle,
      iconColor: "text-destructive",
      valueColor: "text-destructive"
    }
  ];

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="border-0 shadow-sm border-red-200">
            <CardContent className="p-6">
              <div className="text-red-600 text-sm">Erro ao carregar dados</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statisticsData.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className={`text-2xl font-bold ${stat.valueColor}`}>
                {stat.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}