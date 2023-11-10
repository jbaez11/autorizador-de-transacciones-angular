import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransactions() {
    return this.http.get("http://localhost:3001/getAccounts");
  }

  authorizeTransaction(transactionData: any) {
    const bodyData = {
      transaccion: transactionData,
    };
    return this.http.post("http://localhost:3001/authorizeTransaction", bodyData);
  }
}
