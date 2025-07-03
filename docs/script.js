// Inicializa uma nova instância do Vue
new Vue({

  el: "#app",

  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      isShowCover: false,
      volume: 1, // Adicionado: volume inicial
      isMuted: false, // Adicionado: estado de mudo
      lastVolume: 1, // Adicionado: para armazenar o último volume antes de mutar
      // Lista de faixas
      tracks: [
		{
          name: "Only You",
          artist: "Astor",
          cover: "ASTOR.jpg",
          source: "ASTOR.mp3",
          url: "https://www.youtube.com/watch?v=cYbFOpZuOAg&list=RDcYbFOpZuOAg&start_radio=1",
          favorited: true
        },
		{
          name: "Now That I've Found You",
          artist: "Martin Garrix",
          cover: "MartinGarrix.jpg",
          source: "MartinGarrix.mp3",
          url: "https://www.youtube.com/watch?v=xuSxRuk_07Y&list=RDxuSxRuk_07Y&start_radio=1",
          favorited: false
        },
        {
          name: "Silhouettes Radio Edit",
          artist: "Avicii",
          cover: "Avicii.jpg",
          source: "Avicii.mp3",
          url: "https://www.youtube.com/watch?v=EZJddokblFk&list=RDEZJddokblFk&start_radio=1",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },


   methods: {
    // Controla a reprodução/pausa do áudio
    play() {
      if (this.audio.paused) {
        // Se o áudio está pausado, reproduz e atualiza o estado
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        // Se o áudio está tocando, pausa e atualiza o estado
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },

    generateTime() {
      // Calcula a porcentagem de progresso com base no tempo atual e total
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%"; 
      this.circleLeft = width + "%"; 

      // Calcula minutos e segundos da duração total
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      // Calculates minutos e segundos do tempo atual
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);

      // Adiciona zero à esquerda para valores menores que 10
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }

      // Formata e armazena os tempos no formato mm:ss
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },

    // Atualiza a posição do áudio com base em um clique na barra de progresso
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;

      // Limita a porcentagem entre 0 e 100
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }

      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      // Inicia a reprodução
      this.audio.play();
    },

    // Manipula cliques na barra de progresso
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      // Atualiza a posição do áudio com base na posição do clique
      this.updateBar(e.pageX);
    },

    // Navega para a faixa anterior
    prevTrack() {
      this.transitionName = "scale-in";
      // Oculta a capa da faixa
      this.isShowCover = false;
      // Decrementa o índice da faixa atual ou volta ao último se estiver no início
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      // Atualiza a faixa atual
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },

    // Navega para a próxima faixa
    nextTrack() {
      this.transitionName = "scale-out";
      // Oculta a capa da faixa
      this.isShowCover = false;
      // Incrementa o índice da faixa atual ou volta ao início se estiver no final
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      // Reseta o reprodutor
      this.resetPlayer();
    },

    // Reseta o reprodutor para a nova faixa
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      // Reseta o tempo atual do áudio
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      this.audio.volume = this.volume; // Garante que o volume seja aplicado ao trocar de faixa
      // Aguarda 300ms para garantir a transição e reproduz/pausa conforme o estado
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },

    // Alterna o estado de favorito da faixa atual
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    },

    // Adicionado: Define o volume do áudio
    setVolume() {
      if (this.audio) {
        this.audio.volume = this.volume;
        this.isMuted = this.volume === 0;
        if (this.volume > 0) {
          this.lastVolume = this.volume; // Armazena o volume atual se não for zero
        }
      }
    },

    // Adicionado: Alterna o estado de mudo
    toggleMute() {
      if (this.isMuted) {
        this.volume = this.lastVolume > 0 ? this.lastVolume : 1; // Restaura o último volume ou define como 1
        this.isMuted = false;
      } else {
        this.lastVolume = this.volume; // Salva o volume atual antes de mutar
        this.volume = 0;
        this.isMuted = true;
      }
      this.setVolume(); // Aplica o novo volume
    }
  },

  created() {
    // Armazena a referência do componente para uso em callbacks
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.volume = this.volume; // Define o volume inicial do áudio

    // Adicionado: Atualiza o estado do volume e isMuted se o volume do áudio for alterado externamente
    this.audio.onvolumechange = function() {
      if (vm.audio) {
        vm.volume = vm.audio.volume;
        vm.isMuted = vm.audio.muted || vm.audio.volume === 0;
      }
    };

    // Atualiza o tempo de reprodução quando o áudio avança
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };

    // Atualiza o tempo quando os metadados do áudio são carregados
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };

    // Navega para a próxima faixa quando o áudio termina
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // Pré-carrega as capas das faixas (opcional, para melhorar o desempenho)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      // Cria um elemento <link> para pré-carregamento
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      // Adiciona o link ao cabeçalho do documento
      document.head.appendChild(link);
    }
  }
});
