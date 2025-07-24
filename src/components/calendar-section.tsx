import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { useAgendamentosDoDia } from "@/hooks/useAgendamentos";
import { Skeleton } from "@/components/ui/skeleton";

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const { data: agendamentos, isLoading, error } = useAgendamentosDoDia(selectedDateString);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-success text-success-foreground";
      case "agendado":
        return "bg-warning text-warning-foreground";
      case "cancelado":
        return "bg-destructive text-destructive-foreground";
      case "em_andamento":
        return "bg-info text-info-foreground";
      case "concluido":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "agendado":
        return "Agendado";
      case "cancelado":
        return "Cancelado";
      case "em_andamento":
        return "Em Andamento";
      case "concluido":
        return "Concluído";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendário */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calendário</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-0 p-0"
          />
        </CardContent>
      </Card>

      {/* Detalhes dos Agendamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agendamentos de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            // Skeleton loading
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-12" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))
          ) : error ? (
            <div className="text-center py-4 text-red-600 text-sm">
              Erro ao carregar agendamentos
            </div>
          ) : agendamentos?.data?.length ? (
            agendamentos.data.map((agendamento) => (
              <div
                key={agendamento.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(agendamento.data_hora).toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-medium">
                      <User className="h-4 w-4" />
                      {agendamento.cliente}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {agendamento.tipo}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusVariant(agendamento.status)}>
                  {getStatusLabel(agendamento.status)}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              Nenhum agendamento para esta data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}