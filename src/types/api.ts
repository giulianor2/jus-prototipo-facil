// Tipos para as APIs do Django

export interface Atendimento {
  id: number;
  autor: string;
  reu: string;
  data_abertura: string;
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  descritivo: string;
  created_at?: string;
  updated_at?: string;
}

export interface Agendamento {
  id: number;
  data_hora: string;
  cliente: string;
  tipo: string;
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
  descricao?: string;
}

export interface Estatisticas {
  atendimentos_mes: number;
  processos_andamento: number;
  agendamentos_hoje: number;
  casos_novos: number;
  total_clientes: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}