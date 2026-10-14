/**
 * Motor Acústico Medieval Sintético (Web Audio API Puro)
 * Zero dependência de arquivos externos quebrados ou CDNs.
 */

class MedievalAudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private noiseNode: AudioBufferSourceNode | null = null;
  private windOsc: OscillatorNode | null = null;
  private droneOsc: OscillatorNode | null = null;

  private initContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Liga ou desliga o som ambiente medieval (lareira crepitante + vento suave)
   */
  public toggleAmbiente(): boolean {
    if (this.isAmbientPlaying) {
      this.pararAmbiente();
      return false;
    } else {
      this.iniciarAmbiente();
      return true;
    }
  }

  public isAmbienteAtivo(): boolean {
    return this.isAmbientPlaying;
  }

  public iniciarAmbiente() {
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.isAmbientPlaying) return;

    try {
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2.5);
      this.ambientGain.connect(ctx.destination);

      // 1. Buffer de Ruído Rosa/Marrom para o crepitar da lareira
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.08;
        b2 = 0.85 * b2 + white * 0.12;
        // Adicionar estalidos esparsos de brasa
        const pop = Math.random() > 0.998 ? (Math.random() * 0.8) : 0;
        output[i] = (b0 + b1 + b2) * 0.25 + pop;
      }

      this.noiseNode = ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Filtro passa-baixa para dar sensação de brasa quente
      const fireFilter = ctx.createBiquadFilter();
      fireFilter.type = 'lowpass';
      fireFilter.frequency.setValueAtTime(450, ctx.currentTime);

      this.noiseNode.connect(fireFilter);
      fireFilter.connect(this.ambientGain);
      this.noiseNode.start();

      // 2. Drone de vento medieval (Oscilador senoidal lento em Lá menor / Ré)
      this.windOsc = ctx.createOscillator();
      this.windOsc.type = 'sine';
      this.windOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.03, ctx.currentTime);

      this.windOsc.connect(windGain);
      windGain.connect(this.ambientGain);
      this.windOsc.start();

      this.isAmbientPlaying = true;
    } catch (err) {
      console.warn('Não foi possível iniciar o áudio sintético:', err);
    }
  }

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
          this.noiseNode?.disconnect();
          this.windOsc?.disconnect();
        } catch (_) {}
        this.isAmbientPlaying = false;
      }, 1200);
    } catch (_) {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Efeito Sonoro Tátil: Rolar Dados 2d6 (choque de ossos / madeira)
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
   * Efeito Sonoro Tátil: Virar Página de Pergaminho (fricção suave)
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
   * Efeito Sonoro Tátil: Escolha Tomada (Sino / Ressonância de Ferro)
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
    oscHarmonico.frequency.setValueAtTime(880, agora); // Harmonico superior

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
