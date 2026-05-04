type PaymentStatus = 'idle' | 'loading' | 'success' | 'failed';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentService } from './services/Payment';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  private paymentService = inject(PaymentService);

  pay() {
    this.paymentService.createPayment(10000).subscribe((res) => {
      window.location.href = res.paymentUrl;
    });
  }
}
