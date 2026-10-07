import { Component, computed, DestroyRef, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { init, sendForm } from '@emailjs/browser';
import {
  LucideArrowLeft,
  LucideDynamicIcon,
  LucideSend,
  type LucideIcon
} from '@lucide/angular';
import { EMAILJS_CONFIG } from '../core/config/emailjs.config';

type ContactStatus = 'success' | 'error' | null;

const trimmedRequired: ValidatorFn = control =>
  typeof control.value === 'string' && control.value.trim().length > 0
    ? null
    : { trimmedRequired: true };

const trimmedEmail: ValidatorFn = control => {
  if (typeof control.value !== 'string' || !control.value.trim()) {
    return null;
  }

  return Validators.email(new FormControl(control.value.trim()));
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isSending = signal(false);
  protected readonly submitted = signal(false);
  protected readonly status = signal<ContactStatus>(null);
  protected readonly statusMessage = computed(() => {
    if (this.status() === 'success') {
      return "Message sent successfully! Thanks for reaching out. I'll get back to you as soon as possible.";
    }
    if (this.status() === 'error') {
      return 'Unable to send your message right now. Please try again.';
    }
    return '';
  });
  protected readonly sendIcon: LucideIcon = LucideSend;
  protected readonly backIcon: LucideIcon = LucideArrowLeft;
  @ViewChild('contactFormElement', { read: ElementRef })
  private contactFormElement?: ElementRef<HTMLFormElement>;
  private statusTimer?: number;
  private lastRequestAt = 0;

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [trimmedRequired, Validators.maxLength(100)]],
    email: ['', [trimmedRequired, trimmedEmail, Validators.maxLength(254)]],
    subject: ['', [trimmedRequired, Validators.maxLength(150)]],
    message: ['', [trimmedRequired, Validators.maxLength(5000)]],
    website: ['']
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.statusTimer !== undefined) {
        window.clearTimeout(this.statusTimer);
      }
    });

    if (this.isEmailJsConfigured()) {
      init({
        publicKey: EMAILJS_CONFIG.publicKey,
        blockHeadless: true,
        limitRate: {
          id: 'portfolio-contact',
          throttle: 10000
        }
      });
    }
  }

  protected shouldShowError(controlName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  protected fieldError(controlName: 'name' | 'email' | 'subject' | 'message'): string {
    const control = this.form.controls[controlName];
    if (control.hasError('trimmedRequired')) {
      return 'This field is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    if (control.hasError('maxlength')) {
      const limit = control.getError('maxlength')?.requiredLength;
      return `Please keep this field to ${limit} characters or fewer.`;
    }
    return '';
  }

  protected async submit(): Promise<void> {
    if (this.isSending()) {
      return;
    }

    this.submitted.set(true);
    this.trimTextFields();
    this.form.markAllAsTouched();
    this.clearStatus();

    if (this.form.invalid) {
      return;
    }

    if (this.form.controls.website.value || !this.isEmailJsConfigured()) {
      this.showStatus('error');
      return;
    }

    if (Date.now() - this.lastRequestAt < 10000) {
      this.showStatus('error');
      return;
    }

    const nativeForm = this.contactFormElement?.nativeElement;
    if (!nativeForm) {
      this.showStatus('error');
      return;
    }

    this.lastRequestAt = Date.now();
    this.isSending.set(true);

    try {
      const response = await sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        nativeForm
      );

      if (response.status < 200 || response.status >= 300) {
        this.showStatus('error');
        return;
      }

      this.form.reset();
      this.submitted.set(false);
      this.showStatus('success');
    } catch {
      this.showStatus('error');
    } finally {
      this.isSending.set(false);
    }
  }

  private trimTextFields(): void {
    const { name, email, subject, message } = this.form.controls;
    name.setValue(name.value.trim());
    email.setValue(email.value.trim());
    subject.setValue(subject.value.trim());
    message.setValue(message.value.trim());
  }

  private isEmailJsConfigured(): boolean {
    return Boolean(
      EMAILJS_CONFIG.publicKey.trim() &&
      EMAILJS_CONFIG.serviceId.trim() &&
      EMAILJS_CONFIG.templateId.trim()
    );
  }

  private clearStatus(): void {
    if (this.statusTimer !== undefined) {
      window.clearTimeout(this.statusTimer);
      this.statusTimer = undefined;
    }
    this.status.set(null);
  }

  private showStatus(status: Exclude<ContactStatus, null>): void {
    this.clearStatus();
    this.status.set(status);
    this.statusTimer = window.setTimeout(() => {
      this.status.set(null);
      this.statusTimer = undefined;
    }, 5000);
  }
}
