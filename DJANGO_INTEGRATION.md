# Integração Frontend React com Backend Django

## 📋 Configuração Necessária no Django

### 1. Instalação de Dependências

```bash
pip install django djangorestframework django-cors-headers
```

### 2. Configuração no settings.py

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'seu_app',  # Substitua pelo nome do seu app
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configuração CORS para desenvolvimento
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",  # React dev server
    "http://127.0.0.1:8080",
]

CORS_ALLOW_CREDENTIALS = True

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
```

### 3. URLs principais (urls.py)

```python
# projeto/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('seu_app.urls')),  # Substitua pelo nome do seu app
]
```

## 🗂️ Estrutura de Models Necessária

### models.py

```python
from django.db import models
from django.contrib.auth.models import User

class Atendimento(models.Model):
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('em_andamento', 'Em Andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]
    
    autor = models.CharField(max_length=255)
    reu = models.CharField(max_length=255)
    data_abertura = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='agendado')
    descritivo = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.autor} vs {self.reu}"

class Agendamento(models.Model):
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('confirmado', 'Confirmado'),
        ('em_andamento', 'Em Andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]
    
    data_hora = models.DateTimeField()
    cliente = models.CharField(max_length=255)
    tipo = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='agendado')
    descricao = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['data_hora']
    
    def __str__(self):
        return f"{self.cliente} - {self.data_hora}"
```

## 🔧 Serializers (serializers.py)

```python
from rest_framework import serializers
from .models import Atendimento, Agendamento

class AtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atendimento
        fields = '__all__'

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
```

## 📡 Views (views.py)

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, date
from django.db.models import Count
from .models import Atendimento, Agendamento
from .serializers import AtendimentoSerializer, AgendamentoSerializer

class AtendimentoViewSet(viewsets.ModelViewSet):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer
    
    def get_queryset(self):
        queryset = Atendimento.objects.all()
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer
    
    def get_queryset(self):
        queryset = Agendamento.objects.all()
        data = self.request.query_params.get('data', None)
        if data:
            try:
                data_obj = datetime.strptime(data, '%Y-%m-%d').date()
                queryset = queryset.filter(data_hora__date=data_obj)
            except ValueError:
                pass
        return queryset
    
    @action(detail=False, methods=['get'])
    def dia(self, request):
        """Retorna agendamentos de um dia específico"""
        data = request.query_params.get('data')
        if not data:
            return Response({'error': 'Data é obrigatória'}, status=400)
        
        try:
            data_obj = datetime.strptime(data, '%Y-%m-%d').date()
            agendamentos = Agendamento.objects.filter(data_hora__date=data_obj)
            serializer = self.get_serializer(agendamentos, many=True)
            return Response({
                'data': serializer.data,
                'status': 'success'
            })
        except ValueError:
            return Response({'error': 'Formato de data inválido. Use YYYY-MM-DD'}, status=400)
    
    @action(detail=True, methods=['patch'])
    def cancelar(self, request, pk=None):
        """Cancela um agendamento"""
        agendamento = self.get_object()
        agendamento.status = 'cancelado'
        agendamento.save()
        serializer = self.get_serializer(agendamento)
        return Response({
            'data': serializer.data,
            'message': 'Agendamento cancelado com sucesso'
        })

@action(detail=False, methods=['get'])
def estatisticas_dashboard(request):
    """Retorna estatísticas para o dashboard"""
    hoje = timezone.now().date()
    primeiro_dia_mes = hoje.replace(day=1)
    
    # Estatísticas
    atendimentos_mes = Atendimento.objects.filter(
        created_at__date__gte=primeiro_dia_mes
    ).count()
    
    processos_andamento = Atendimento.objects.filter(
        status='em_andamento'
    ).count()
    
    agendamentos_hoje = Agendamento.objects.filter(
        data_hora__date=hoje
    ).count()
    
    casos_novos = Atendimento.objects.filter(
        created_at__date=hoje
    ).count()
    
    total_clientes = Atendimento.objects.values('autor').distinct().count()
    
    return Response({
        'data': {
            'atendimentos_mes': atendimentos_mes,
            'processos_andamento': processos_andamento,
            'agendamentos_hoje': agendamentos_hoje,
            'casos_novos': casos_novos,
            'total_clientes': total_clientes,
        },
        'status': 'success'
    })
```

## 🛣️ URLs do App (seu_app/urls.py)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'atendimentos', views.AtendimentoViewSet)
router.register(r'agendamentos', views.AgendamentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('estatisticas/dashboard/', views.estatisticas_dashboard, name='estatisticas-dashboard'),
]
```

## 🚀 Como Executar

### 1. Configurar Django
```bash
# No diretório do seu projeto Django
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

### 2. Executar React (já configurado)
```bash
# No diretório deste projeto React
npm run dev
# Ou bun dev
```

## 📊 Endpoints Disponíveis

- `GET /api/atendimentos/` - Lista atendimentos
- `POST /api/atendimentos/` - Cria atendimento
- `GET /api/atendimentos/{id}/` - Busca atendimento por ID
- `PUT /api/atendimentos/{id}/` - Atualiza atendimento
- `DELETE /api/atendimentos/{id}/` - Remove atendimento

- `GET /api/agendamentos/` - Lista agendamentos
- `GET /api/agendamentos/dia/?data=2024-01-15` - Agendamentos do dia
- `POST /api/agendamentos/` - Cria agendamento
- `PATCH /api/agendamentos/{id}/cancelar/` - Cancela agendamento

- `GET /api/estatisticas/dashboard/` - Estatísticas do dashboard

## 🔧 Configuração de Desenvolvimento

O frontend está configurado para acessar o backend em `http://localhost:8000/api`. 

Certifique-se de que:
1. O Django esteja rodando na porta 8000
2. O CORS esteja configurado corretamente
3. As migrações estejam aplicadas

## 🎯 Próximos Passos

1. Implemente os models no Django
2. Configure as views e serializers
3. Execute as migrações
4. Teste as APIs com dados reais
5. Implemente autenticação se necessário