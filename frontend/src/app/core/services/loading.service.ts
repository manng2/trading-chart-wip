import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  readonly isLoading = signal(false);

  start(): void {
    this.isLoading.set(true);
  }

  stop(): void {
    this.isLoading.set(false);
  }
}
