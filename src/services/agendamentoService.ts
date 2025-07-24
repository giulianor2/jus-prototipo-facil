import { api } from '@/lib/api';
import { Agendamento, PaginatedResponse, ApiResponse } from '@/types/api';

export const agendamentoService = {
  // Listar agendamentos
  listar: async (data?: string) => {
    const url = data ? `/agendamentos/?data=${data}` : '/agendamentos/';
    const response = await api.get<PaginatedResponse<Agendamento>>(url);
    return response.data;
  },

  // Agendamentos do dia
  agendamentosDoDia: async (data: string) => {
    const response = await api.get<ApiResponse<Agendamento[]>>(
      `/agendamentos/dia/?data=${data}`
    );
    return response.data;
  },

  // Criar agendamento
  criar: async (agendamento: Omit<Agendamento, 'id'>) => {
    const response = await api.post<ApiResponse<Agendamento>>('/agendamentos/', agendamento);
    return response.data;
  },

  // Atualizar agendamento
  atualizar: async (id: number, agendamento: Partial<Agendamento>) => {
    const response = await api.put<ApiResponse<Agendamento>>(`/agendamentos/${id}/`, agendamento);
    return response.data;
  },

  // Cancelar agendamento
  cancelar: async (id: number) => {
    const response = await api.patch<ApiResponse<Agendamento>>(`/agendamentos/${id}/cancelar/`);
    return response.data;
  },
};