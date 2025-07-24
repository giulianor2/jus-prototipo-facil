import { api } from '@/lib/api';
import { Atendimento, PaginatedResponse, ApiResponse } from '@/types/api';

export const atendimentoService = {
  // Listar atendimentos
  listar: async (page = 1, limit = 10) => {
    const response = await api.get<PaginatedResponse<Atendimento>>(
      `/atendimentos/?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Buscar atendimento por ID
  buscarPorId: async (id: number) => {
    const response = await api.get<ApiResponse<Atendimento>>(`/atendimentos/${id}/`);
    return response.data;
  },

  // Criar novo atendimento
  criar: async (atendimento: Omit<Atendimento, 'id'>) => {
    const response = await api.post<ApiResponse<Atendimento>>('/atendimentos/', atendimento);
    return response.data;
  },

  // Atualizar atendimento
  atualizar: async (id: number, atendimento: Partial<Atendimento>) => {
    const response = await api.put<ApiResponse<Atendimento>>(`/atendimentos/${id}/`, atendimento);
    return response.data;
  },

  // Deletar atendimento
  deletar: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/atendimentos/${id}/`);
    return response.data;
  },

  // Filtrar por status
  filtrarPorStatus: async (status: Atendimento['status']) => {
    const response = await api.get<PaginatedResponse<Atendimento>>(
      `/atendimentos/?status=${status}`
    );
    return response.data;
  },
};