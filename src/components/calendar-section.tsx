import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

const scheduledAppointments = [
  {
    id: 1,
    time: "09:00",
    client: "Pedro Silva",
    type: "Primeira Consulta",
    status: "Confirmado"
  },
  {
    id: 2,
    time: "10:30",
    client: "Maria Santos",
    type: "Acompanhamento",
    status: "Pendente"
  },
  {
    id: 3,
    time: "14:00",
    client: "João Costa",
    type: "Orientação Jurídica",
    status: "Confirmado"
  },
  {
    id: 4,
    time: "15:30",
    client: "Ana Rodrigues",
    type: "Consulta",
    status: "Cancelado"
  }
];

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-success text-success-foreground";
      case "Pendente":
        return "bg-warning text-warning-foreground";
      case "Cancelado":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
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
          {scheduledAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {appointment.time}
                </div>
                <div>
                  <div className="flex items-center gap-1 font-medium">
                    <User className="h-4 w-4" />
                    {appointment.client}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {appointment.type}
                  </div>
                </div>
              </div>
              <Badge className={getStatusVariant(appointment.status)}>
                {appointment.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}