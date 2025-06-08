export class SoundService {
  private volume: number = 0.5;
  private isMuted: boolean = false;

  playCardFlip(): void {
    // Sound disabled
  }

  playCardReveal(): void {
    // Sound disabled
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export const soundService = new SoundService(); 