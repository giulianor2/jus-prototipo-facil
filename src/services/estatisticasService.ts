import { api } from '@/lib/api';
import { Estatisticas, ApiResponse } from '@/types/api';

export const estatisticasService = {
  // Buscar estatísticas do dashboard
  obterEstatisticas: async () => {
    const response = await api.get<ApiResponse<Estatisticas>>('/estatisticas/dashboard/');
    return response.data;
  },

  // Estatísticas por período
  obterEstatisticasPorPeriodo: async (dataInicio: string, dataFim: string) => {
    const response = await api.get<ApiResponse<Estatisticas>>(
      `/estatisticas/periodo/?inicio=${dataInicio}&fim=${dataFim}`
    );
    return response.data;
  },
};