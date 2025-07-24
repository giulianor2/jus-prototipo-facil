import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { atendimentoService } from '@/services/atendimentoService';
import { useToast } from '@/hooks/use-toast';

export const useAtendimentos = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['atendimentos', page, limit],
    queryFn: () => atendimentoService.listar(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useAtendimento = (id: number) => {
  return useQuery({
    queryKey: ['atendimento', id],
    queryFn: () => atendimentoService.buscarPorId(id),
    enabled: !!id,
  });
};

export const useCriarAtendimento = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: atendimentoService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
      toast({
        title: "Sucesso",
        description: "Atendimento criado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar atendimento. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};

export const useAtualizarAtendimento = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      atendimentoService.atualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
      toast({
        title: "Sucesso",
        description: "Atendimento atualizado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar atendimento. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};