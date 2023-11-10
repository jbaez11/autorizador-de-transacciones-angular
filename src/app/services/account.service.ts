import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAllAccounts() {
    return this.http.get("http://localhost:3001/getAccounts");
  }

  registerAccount(id: number, limite_disponible: number, tarjeta_activa: boolean) {
    const bodyData = {
      cuenta: {
        id: id,
        limite_disponible: limite_disponible,
        tarjeta_activa: tarjeta_activa,
      },
    };

    return this.http.post("http://localhost:3001/createAccount", bodyData);
  }
}
