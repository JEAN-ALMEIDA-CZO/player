# 🎵 Radio Player Vue.js

[![Licença MIT](https://img.shields.io/badge/Licença-MIT-green.svg)](LICENSE.md)
[![Problemas Abertos](https://img.shields.io/github/issues/JEAN-ALMEIDA-CZO/extensao_chamado_glpi?color=red)](https://github.com/JEAN-ALMEIDA-CZO/extensao_chamado_glpi/issues)
[![Último Commit](https://img.shields.io/github/last-commit/JEAN-ALMEIDA-CZO/extensao_chamado_glpi?color=blue)](https://github.com/JEAN-ALMEIDA-CZO/extensao_chamado_glpi/commits)

Um reprodutor de áudio moderno e responsivo desenvolvido em Vue.js para streaming de **estações de rádio gospel**. Com uma interface elegante e funcional, permite controlar a reprodução de forma intuitiva e fluida.

---

## 🌐 Demonstração

Acesse a página de demonstração do projeto para visualizar o player em ação:  
👉 [**Ver Demonstração**](https://jean-almeida-czo.github.io/player)

---

## ✨ Funcionalidades

- ▶️ **Reprodução de Streams** de várias rádios gospel
- ⏯️ **Play/Pause**, próxima faixa e faixa anterior
- ⭐ **Favoritos**: marque suas estações preferidas
- ⏱️ **Barra de Progresso Interativa** com tempo atual e total
- 📷 **Pré-carregamento de Capas** com `prefetch`
- 🎨 **Transições Visuais** suaves com CSS

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 2** — Framework principal da interface
- **HTML5 Audio API** — Manipulação e controle de áudio
- **CSS** — Estilização visual customizada

---

## 🧩 Estrutura do Projeto

- `script.js` — Lógica central do player
- `data` — Lista estática de estações de rádio (nome, artista, capa, URL, etc.)

### Principais Métodos:

- `play()` — Reproduz ou pausa a faixa atual  
- `generateTime()` — Atualiza a barra de progresso e tempo  
- `clickProgress(e)` — Avança ou retrocede o áudio com base no clique  
- `updateBar(x)` — Sincroniza a barra com o tempo  
- `prevTrack()` / `nextTrack()` — Alterna entre faixas  
- `resetPlayer()` — Reseta o estado ao mudar a estação  
- `favorite()` — Marca/desmarca como favorito  
- `created()` — Hook de ciclo de vida que inicia o áudio e prefetch das capas

---

## 🚀 Como Usar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/JEAN-ALMEIDA-CZO/player.git
