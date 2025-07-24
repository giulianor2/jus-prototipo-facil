import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { agendamentoService } from '@/services/agendamentoService';
import { useToast } from '@/hooks/use-toast';

export const useAgendamentos = (data?: string) => {
  return useQuery({
    queryKey: ['agendamentos', data],
    queryFn: () => agendamentoService.listar(data),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useAgendamentosDoDia = (data: string) => {
  return useQuery({
    queryKey: ['agendamentos', 'dia', data],
    queryFn: () => agendamentoService.agendamentosDoDia(data),
    enabled: !!data,
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
};

export const useCriarAgendamento = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: agendamentoService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendamentos'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
      toast({
        title: "Sucesso",
        description: "Agendamento criado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar agendamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};

export const useCancelarAgendamento = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: agendamentoService.cancelar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendamentos'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
      toast({
        title: "Sucesso",
        description: "Agendamento cancelado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao cancelar agendamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};