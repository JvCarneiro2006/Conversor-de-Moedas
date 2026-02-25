# 💸 Conversor de Moedas

Um conversor de moedas em tempo real, desenvolvido em JavaScript vanilla, com suporte a BTC, BRL e USDT.

## 🎯 Características

- **Conversão em Tempo Real**: Utiliza a API da Binance para obter cotações atualizadas
- **Múltiplas Moedas**: Suporta conversão entre BTC, BRL e USDT
- **Tema Claro/Escuro**: Toggle para alternar entre temas
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- **Histórico Salvo**: Mantém registro do último resultado de conversão
- **Design Moderno**: Interface intuitiva com fonte Poppins

## 📁 Estrutura do Projeto

```
ConversorDeMoedas/
├── index.html           # Arquivo HTML principal
├── ultimoResultado.js   # Armazenamento do último resultado
├── README.md           # Este arquivo
├── Estilo/
│   └── estilo.css      # Estilos CSS (temas claro e escuro)
└── Script/
    └── AppWeb.js       # Lógica principal em JavaScript
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos com suporte a temas
- **JavaScript (ES6+)**: Lógica de conversão e integração com API
- **API Binance**: Cotações em tempo real

## 🚀 Como Usar

1. **Abra o arquivo** `index.html` em seu navegador
2. **Digite o valor** que deseja converter no campo de entrada
3. **Selecione as moedas**:
   - "De": Moeda de origem
   - "Para": Moeda de destino
4. **Veja o resultado** calculado automaticamente
5. **Alterne o tema** usando o botão toggle no canto superior

## 📋 Requisitos

- Navegador moderno com suporte a:
  - Fetch API
  - ES6+ JavaScript
  - CSS Grid/Flexbox
- Conexão com a internet (para obter cotações em tempo real)

## ⚙️ Funcionalidades em Detalhe

### Conversão de Moedas
O aplicativo converte valores entre as seguintes moedas:
- **BTC** - Bitcoin
- **BRL** - Real Brasileiro
- **USDT** - Tether

### Temas
- **Tema Claro**: Fundo branco com sombra cinza
- **Tema Escuro**: Fundo escuro com acentos verdes

### Dados de Fallback
Se houver problema na conexão com a API Binance, o aplicativo usa uma cotação padrão armazenada como fallback.

## 📝 Notas Técnicas

- A API é consultada apenas uma vez durante a sessão
- Cálculos usam precisão:
  - **8 casas decimais** para criptomoedas (BTC)
  - **2 casas decimais** para moedas fiduciárias (BRL, USDT)
- O último resultado é salvo no `localStorage`

## 👨‍💻 Desenvolvedor

© 2026 **João Vitor Carneiro**

## 📄 Licença

Projeto desenvolvido para fins educacionais e aprimoramento pessoal.
