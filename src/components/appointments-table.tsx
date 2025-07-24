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
import { useAtendimentos } from "@/hooks/useAtendimentos";
import { Skeleton } from "@/components/ui/skeleton";

const getStatusVariant = (status: string) => {
  switch (status) {
    case "em_andamento":
      return "bg-info text-info-foreground";
    case "concluido":
      return "bg-success text-success-foreground";
    case "agendado":
      return "bg-warning text-warning-foreground";
    case "cancelado":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "em_andamento":
      return "Em Andamento";
    case "concluido":
      return "Concluído";
    case "agendado":
      return "Agendado";
    case "cancelado":
      return "Cancelado";
    default:
      return status;
  }
};

export function AppointmentsTable() {
  const { data: atendimentos, isLoading, error } = useAtendimentos();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atendimentos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-600">
            Erro ao carregar atendimentos. Verifique se o backend está rodando.
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {isLoading ? (
              // Skeleton loading
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                </TableRow>
              ))
            ) : (
              atendimentos?.results?.map((atendimento) => (
                <TableRow key={atendimento.id}>
                  <TableCell className="font-medium">
                    {atendimento.autor}
                  </TableCell>
                  <TableCell>{atendimento.reu}</TableCell>
                  <TableCell>
                    {new Date(atendimento.data_abertura).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusVariant(atendimento.status)}>
                      {getStatusLabel(atendimento.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {atendimento.descritivo}
                  </TableCell>
                </TableRow>
              )) || (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum atendimento encontrado
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}