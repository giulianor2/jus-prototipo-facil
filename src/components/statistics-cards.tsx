import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Clock, AlertCircle } from "lucide-react";

const statisticsData = [
  {
    title: "Atendimentos do Mês",
    value: "142",
    icon: Users,
    iconColor: "text-info",
    valueColor: "text-info"
  },
  {
    title: "Processos em Andamento",
    value: "38",
    icon: FileText,
    iconColor: "text-primary",
    valueColor: "text-primary"
  },
  {
    title: "Agendamentos Hoje",
    value: "12",
    icon: Calendar,
    iconColor: "text-success",
    valueColor: "text-success"
  },
  {
    title: "Aguardando Retorno",
    value: "7",
    icon: Clock,
    iconColor: "text-warning",
    valueColor: "text-warning"
  },
  {
    title: "Pendências",
    value: "3",
    icon: AlertCircle,
    iconColor: "text-destructive",
    valueColor: "text-destructive"
  }
];

export function StatisticsCards() {
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
            <div className={`text-2xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}