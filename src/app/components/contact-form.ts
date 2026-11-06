import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailService } from '../core/mail.service';

type State = 'idle' | 'sending' | 'sent' | 'error';

/** Formulaire de contact ou de réservation de démo (mode="demo"). Envoi par SMTP via /api/send. */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  readonly mode = input<'contact' | 'demo'>('contact');

  private readonly mail = inject(MailService);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly state = signal<State>('idle');
  protected readonly submitted = signal(false);
  protected readonly isDemo = computed(() => this.mode() === 'demo');

  protected readonly subjects = [
    'Un projet à réaliser',
    'Un schéma directeur ou un audit',
    'Un accompagnement de fin de cycle',
    'Une offre de poste',
    'Autre chose',
  ];
  protected readonly errorText = signal('');
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap);
  protected readonly positions = ['Préfet ou directeur', 'Promoteur', 'Économe', 'Enseignant', 'Autre'];
  protected readonly slots = ['En semaine, le matin', 'En semaine, l’après-midi', 'Le samedi', 'Peu importe'];

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    subject: [this.subjects[0]],
    phone: ['', [Validators.maxLength(40)]],
    school: ['', [Validators.maxLength(160)]],
    position: [this.positions[0]],
    city: ['', [Validators.maxLength(80)]],
    slot: [this.slots[0]],
    message: ['', [Validators.maxLength(4000)]],
    website: [''],
  });

  constructor() {
    effect(() => {
      const sujet = this.query()?.get('sujet');
      if (sujet === 'etudiant') this.form.controls.subject.setValue(this.subjects[2]);
      if (sujet === 'audit') this.form.controls.subject.setValue(this.subjects[1]);
    });
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  async submit(): Promise<void> {
    this.submitted.set(true);

    // champs requis selon le mode
    const { message, school } = this.form.controls;
    if (this.isDemo()) {
      school.addValidators(Validators.required);
      message.removeValidators(Validators.required);
    } else {
      message.addValidators(Validators.required);
      school.removeValidators(Validators.required);
    }
    school.updateValueAndValidity();
    message.updateValueAndValidity();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');
    const v = this.form.getRawValue();
    try {
      if (this.isDemo()) {
        await this.mail.send({
          type: 'demo',
          name: v.name,
          email: v.email,
          phone: v.phone,
          school: v.school,
          position: v.position,
          city: v.city,
          slot: v.slot,
          message: v.message,
          website: v.website,
        });
      } else {
        await this.mail.send({
          type: 'contact',
          name: v.name,
          email: v.email,
          subject: v.subject,
          message: v.message,
          website: v.website,
        });
      }
      this.state.set('sent');
      this.form.reset();
      this.submitted.set(false);
    } catch (err) {
      const msg = err instanceof HttpErrorResponse ? err.error?.error : '';
      this.errorText.set(typeof msg === 'string' ? msg : '');
      this.state.set('error');
    }
  }

  again(): void {
    this.state.set('idle');
  }
}
