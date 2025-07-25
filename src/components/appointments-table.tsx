import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const appointmentsData = [
  {
    id: 1,
    author: "Maria Santos Silva",
    defendant: "João Pedro Costa",
    openDate: "2024-01-15",
    status: "Em Andamento",
    description: "Ação de divórcio consensual"
  },
  {
    id: 2,
    author: "Carlos Eduardo Lima",
    defendant: "Empresa XYZ Ltda",
    openDate: "2024-01-20",
    status: "Aguardando",
    description: "Ação trabalhista - rescisão indireta"
  },
  {
    id: 3,
    author: "Ana Paula Rodrigues",
    defendant: "Estado de São Paulo",
    openDate: "2024-01-22",
    status: "Finalizado",
    description: "Mandado de segurança - aposentadoria"
  },
  {
    id: 4,
    author: "Roberto Alves",
    defendant: "Banco ABC S.A.",
    openDate: "2024-01-25",
    status: "Em Andamento",
    description: "Revisão de contrato bancário"
  },
  {
    id: 5,
    author: "Fernanda Costa",
    defendant: "Plano de Saúde DEF",
    openDate: "2024-01-28",
    status: "Pendente",
    description: "Negativa de cobertura médica"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Em Andamento":
      return "bg-info text-info-foreground";
    case "Finalizado":
      return "bg-success text-success-foreground";
    case "Aguardando":
      return "bg-warning text-warning-foreground";
    case "Pendente":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function AppointmentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome (Autor)</TableHead>
              <TableHead>Nome (Réu)</TableHead>
              <TableHead>Data Abertura</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[300px]">Descritivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentsData.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.author}
                </TableCell>
                <TableCell>{appointment.defendant}</TableCell>
                <TableCell>
                  {new Date(appointment.openDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusVariant(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {appointment.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}