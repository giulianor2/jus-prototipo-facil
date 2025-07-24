import { useQuery } from '@tanstack/react-query';
import { estatisticasService } from '@/services/estatisticasService';

export const useEstatisticas = () => {
  return useQuery({
    queryKey: ['estatisticas', 'dashboard'],
    queryFn: () => estatisticasService.obterEstatisticas(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};

export const useEstatisticasPorPeriodo = (dataInicio: string, dataFim: string) => {
  return useQuery({
    queryKey: ['estatisticas', 'periodo', dataInicio, dataFim],
    queryFn: () => estatisticasService.obterEstatisticasPorPeriodo(dataInicio, dataFim),
    enabled: !!dataInicio && !!dataFim,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};