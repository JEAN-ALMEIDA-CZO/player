# Radio Player Vue.js

Um reprodutor de áudio baseado em Vue.js para streaming de estações de rádio gospel. O projeto oferece uma interface simples e funcional para reproduzir, pausar, navegar entre estações, favoritar e interagir com uma barra de progresso para controle de reprodução.

## Funcionalidades
- **Reprodução de Streams de Rádio**: Suporta streaming de áudio de várias estações de rádio gospel.
- **Controles de Reprodução**: Botões para play/pausa, próxima faixa e faixa anterior.
- **Barra de Progresso Interativa**: Permite avançar ou retroceder o áudio clicando na barra de progresso.
- **Favoritos**: Permite marcar estações como favoritas.
- **Pré-carregamento de Capas**: Otimiza o carregamento de imagens de capa com prefetch.
- **Transições Visuais**: Efeitos de transição CSS para troca de faixas.

## Tecnologias Utilizadas
- **Vue.js 2**: Framework JavaScript para construção da interface reativa.
- **HTML5 Audio API**: Para manipulação de áudio e streaming.
- **CSS**: Estilização básica da interface (requer HTML com estilos correspondentes).

## Estrutura do Projeto
- **JavaScript (Vue.js)**: O arquivo principal contém a lógica do reprodutor, incluindo gerenciamento de estado, métodos de reprodução e navegação.
- **Dados**: Lista estática de estações de rádio com nome, artista, capa, URL de streaming e link externo.
- **Métodos**:
  - `play()`: Alterna entre reproduzir e pausar o áudio.
  - `generateTime()`: Atualiza a barra de progresso e exibe o tempo atual/duração.
  - `updateBar(x)`: Ajusta o tempo do áudio com base em cliques na barra de progresso.
  - `clickProgress(e)`: Manipula cliques na barra de progresso.
  - `prevTrack()`: Navega para a faixa anterior.
  - `nextTrack()`: Navega para a próxima faixa.
  - `resetPlayer()`: Reseta o reprodutor ao mudar de faixa.
  - `favorite()`: Alterna o estado de favorito da faixa atual.
- **Ciclo de Vida**: O gancho `created` inicializa o áudio, configura eventos e pré-carrega capas.

## Como Usar
1. **Pré-requisitos**:
   - Inclua a biblioteca Vue.js 2 via CDN ou localmente.
   - Crie um arquivo HTML com um elemento `#app` e estilos para a barra de progresso, capa e botões.
   - Certifique-se de que a imagem de capa (`01.jpg`) esteja no diretório correto.

2. **Instalação**:
   - Clone o repositório:
     git clone https://github.com/JEAN-ALMEIDA-CZO/player.git
