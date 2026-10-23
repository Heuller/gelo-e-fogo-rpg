/**
 * Motor Acústico Medieval Sintético (Web Audio API Puro)
 * Zero dependências externas de áudio ou arquivos MP3 pesados.
 * Sintetiza dinamicamente paisagens sonoras regionais de Westeros.
 */

export type PerfilSonoro = 'padrao' | 'inverno' | 'fogo' | 'corte' | 'tempestade';

export interface ParametrosPerfil {
  droneFreq: number;
  droneGain: number;
  windGain: number;
  fireFilterFreq: number;
  fireGain: number;
}

const PERFIS_SONOROS: Record<PerfilSonoro, ParametrosPerfil> = {
  // Lareira crepitante acolhedora e vento suave de estalagem
  padrao: {
    droneFreq: 55.0, // A1
    droneGain: 0.03,
    windGain: 0.025,
    fireFilterFreq: 450,
    fireGain: 0.10,
  },
  // Vento cortante polar da Muralha, gelo estalando e drone fúnebre
  inverno: {
    droneFreq: 43.65, // F0
    droneGain: 0.045,
    windGain: 0.065,
    fireFilterFreq: 280,
    fireGain: 0.04,
  },
  // Brasas vulcânicas e rugido sísmico de Pedra do Dragão
  fogo: {
    droneFreq: 36.71, // D0
    droneGain: 0.05,
    windGain: 0.02,
    fireFilterFreq: 380,
    fireGain: 0.15,
  },
  // Grande salão com acústica de pedra e fogo nobre da Fortaleza Vermelha
  corte: {
    droneFreq: 110.0, // A2
    droneGain: 0.02,
    windGain: 0.015,
    fireFilterFreq: 520,
    fireGain: 0.09,
  },
  // Ventanias furiosas e trovoadas oceânicas de Ponta Tempestade
  tempestade: {
    droneFreq: 48.99, // G0
    droneGain: 0.04,
    windGain: 0.075,
    fireFilterFreq: 320,
    fireGain: 0.06,
  },
};

export function identificarPerfilRegional(regiaoOuTexto?: string): PerfilSonoro {
  if (!regiaoOuTexto) return 'padrao';
  const texto = regiaoOuTexto.toLowerCase();

  if (
    texto.includes('muralha') ||
    texto.includes('castelo_negro') ||
    texto.includes('castelo negro') ||
    texto.includes('norte') ||
    texto.includes('winterfell') ||
    texto.includes('floresta_assombrada') ||
    texto.includes('neve') ||
    texto.includes('gelo')
  ) {
    return 'inverno';
  }

  if (
    texto.includes('pedra_dragao') ||
    texto.includes('pedra do dragão') ||
    texto.includes('fogo') ||
    texto.includes('dragao') ||
    texto.includes('dragão') ||
    texto.includes('valiria')
  ) {
    return 'fogo';
  }

  if (
    texto.includes('porto_real') ||
    texto.includes('porto real') ||
    texto.includes('corte') ||
    texto.includes('trono') ||
    texto.includes('septo') ||
    texto.includes('terras_da_coroa')
  ) {
    return 'corte';
  }

  if (
    texto.includes('tempestade') ||
    texto.includes('harrenhal') ||
    texto.includes('mar') ||
    texto.includes('batalha') ||
    texto.includes('goela')
  ) {
    return 'tempestade';
  }

  return 'padrao';
}

class MedievalAudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private noiseNode: AudioBufferSourceNode | null = null;
  private windOsc: OscillatorNode | null = null;
  private windGainNode: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGainNode: GainNode | null = null;
  private fireFilterNode: BiquadFilterNode | null = null;
  private fireGainNode: GainNode | null = null;
  private perfilAtual: PerfilSonoro = 'padrao';

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Alterna a paisagem sonora ambiente medieval
   */
  public toggleAmbiente(regiaoOuTexto?: string): boolean {
    if (this.isAmbientPlaying) {
      this.pararAmbiente();
      return false;
    } else {
      this.iniciarAmbiente(regiaoOuTexto);
      return true;
    }
  }

  public isAmbienteAtivo(): boolean {
    return this.isAmbientPlaying;
  }

  public getPerfilAtual(): PerfilSonoro {
    return this.perfilAtual;
  }

  /**
   * Inicia o ambiente acústico sintetizado adaptado à região informada
   */
  public iniciarAmbiente(regiaoOuTexto?: string) {
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.isAmbientPlaying) {
      this.atualizarRegiao(regiaoOuTexto);
      return;
    }

    try {
      this.perfilAtual = identificarPerfilRegional(regiaoOuTexto);
      const params = PERFIS_SONOROS[this.perfilAtual];

      // Ganho mestre com ataque suave de 2.0 segundos
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 2.0);
      this.ambientGain.connect(ctx.destination);

      // 1. Sintetizador de crepitação de brasa e estalos térmicos
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.08;
        b2 = 0.85 * b2 + white * 0.12;
        const pop = Math.random() > 0.997 ? Math.random() * 0.75 : 0;
        output[i] = (b0 + b1 + b2) * 0.25 + pop;
      }

      this.noiseNode = ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.fireFilterNode = ctx.createBiquadFilter();
      this.fireFilterNode.type = 'lowpass';
      this.fireFilterNode.frequency.setValueAtTime(params.fireFilterFreq, ctx.currentTime);

      this.fireGainNode = ctx.createGain();
      this.fireGainNode.gain.setValueAtTime(params.fireGain, ctx.currentTime);

      this.noiseNode.connect(this.fireFilterNode);
      this.fireFilterNode.connect(this.fireGainNode);
      this.fireGainNode.connect(this.ambientGain);
      this.noiseNode.start();

      // 2. Drone de ressonância de baixa frequência
      this.droneOsc = ctx.createOscillator();
      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(params.droneFreq, ctx.currentTime);

      this.droneGainNode = ctx.createGain();
      this.droneGainNode.gain.setValueAtTime(params.droneGain, ctx.currentTime);

      this.droneOsc.connect(this.droneGainNode);
      this.droneGainNode.connect(this.ambientGain);
      this.droneOsc.start();

      // 3. Drone de vento medieval
      this.windOsc = ctx.createOscillator();
      this.windOsc.type = 'triangle';
      this.windOsc.frequency.setValueAtTime(params.droneFreq * 1.5, ctx.currentTime);

      this.windGainNode = ctx.createGain();
      this.windGainNode.gain.setValueAtTime(params.windGain, ctx.currentTime);

      this.windOsc.connect(this.windGainNode);
      this.windGainNode.connect(this.ambientGain);
      this.windOsc.start();

      this.isAmbientPlaying = true;
    } catch (err) {
      console.warn('Não foi possível iniciar o áudio sintético:', err);
    }
  }

  /**
   * Modula suavemente os parâmetros acústicos para a nova região sem cortes sonoros
   */
  public atualizarRegiao(regiaoOuTexto?: string) {
    if (!this.isAmbientPlaying || !this.ctx) return;

    const novoPerfil = identificarPerfilRegional(regiaoOuTexto);
    if (novoPerfil === this.perfilAtual) return;

    this.perfilAtual = novoPerfil;
    const params = PERFIS_SONOROS[novoPerfil];
    const agora = this.ctx.currentTime;
    const duracaoCrossfade = 2.0;

    try {
      if (this.droneOsc) {
        this.droneOsc.frequency.exponentialRampToValueAtTime(
          params.droneFreq,
          agora + duracaoCrossfade
        );
      }
      if (this.droneGainNode) {
        this.droneGainNode.gain.linearRampToValueAtTime(
          params.droneGain,
          agora + duracaoCrossfade
        );
      }
      if (this.windOsc) {
        this.windOsc.frequency.exponentialRampToValueAtTime(
          params.droneFreq * 1.5,
          agora + duracaoCrossfade
        );
      }
      if (this.windGainNode) {
        this.windGainNode.gain.linearRampToValueAtTime(
          params.windGain,
          agora + duracaoCrossfade
        );
      }
      if (this.fireFilterNode) {
        this.fireFilterNode.frequency.exponentialRampToValueAtTime(
          params.fireFilterFreq,
          agora + duracaoCrossfade
        );
      }
      if (this.fireGainNode) {
        this.fireGainNode.gain.linearRampToValueAtTime(
          params.fireGain,
          agora + duracaoCrossfade
        );
      }
    } catch (_) {}
  }

  /**
   * Encerra a paisagem sonora com fade-out gradual
   */
  public pararAmbiente() {
    if (!this.ctx || !this.ambientGain) {
      this.isAmbientPlaying = false;
      return;
    }

    try {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.windOsc?.stop();
          this.droneOsc?.stop();
          this.noiseNode?.disconnect();
          this.windOsc?.disconnect();
          this.droneOsc?.disconnect();
        } catch (_) {}
        this.isAmbientPlaying = false;
      }, 1200);
    } catch (_) {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Efeito Sonoro Tátil: Rolar Dados 2d6 (choque de ossos / madeira esculpida)
   */
  public tocarSomDados() {
    const ctx = this.initContext();
    if (!ctx) return;

    const agora = ctx.currentTime;
    const numCliques = 5;

    for (let i = 0; i < numCliques; i++) {
      const delay = i * 0.045 + Math.random() * 0.02;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 260, agora + delay);
      osc.frequency.exponentialRampToValueAtTime(90, agora + delay + 0.05);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600 + Math.random() * 300, agora + delay);
      filter.Q.setValueAtTime(3, agora + delay);

      gain.gain.setValueAtTime(0.18, agora + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + delay + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(agora + delay);
      osc.stop(agora + delay + 0.07);
    }
  }

  /**
   * Efeito Sonoro Tátil: Virar Página de Pergaminho (fricção suave de papel antigo)
   */
  public tocarSomPagina() {
    const ctx = this.initContext();
    if (!ctx) return;

    const agora = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, agora);
    filter.frequency.exponentialRampToValueAtTime(450, agora + 0.18);
    filter.Q.setValueAtTime(1.5, agora);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, agora);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(agora);
  }

  /**
   * Efeito Sonoro Tátil: Escolha Tomada (Sino ancestral / Ressonância de Aço)
   */
  public tocarSomEscolha() {
    const ctx = this.initContext();
    if (!ctx) return;

    const agora = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscHarmonico = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, agora); // Lá 4
    osc.frequency.exponentialRampToValueAtTime(330, agora + 0.8);

    oscHarmonico.type = 'triangle';
    oscHarmonico.frequency.setValueAtTime(880, agora); // Harmônico superior

    gain.gain.setValueAtTime(0.12, agora);
    gain.gain.exponentialRampToValueAtTime(0.0005, agora + 0.9);

    osc.connect(gain);
    oscHarmonico.connect(gain);
    gain.connect(ctx.destination);

    osc.start(agora);
    oscHarmonico.start(agora);
    osc.stop(agora + 0.95);
    oscHarmonico.stop(agora + 0.95);
  }
}

export const audioManager = new MedievalAudioManager();
