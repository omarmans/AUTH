import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  createPayment(amount: number) {
    return this.http.post<any>('http://localhost:3000/pay', { amount });
  }
}
