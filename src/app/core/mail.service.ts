import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface ContactPayload {
  type: 'contact';
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // piège à robots, doit rester vide
}

export interface DemoPayload {
  type: 'demo';
  name: string;
  email: string;
  phone: string;
  school: string;
  position: string;
  city: string;
  slot: string;
  message: string;
  website?: string;
}

/** Envoie les formulaires à la fonction serverless /api/send (SMTP via Vercel). */
@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly http = inject(HttpClient);

  async send(payload: ContactPayload | DemoPayload): Promise<void> {
    await firstValueFrom(this.http.post<{ ok: boolean }>('/api/send', payload));
  }
}
