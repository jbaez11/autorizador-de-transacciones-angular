import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  accountsObject: {
    [key: string]: {
      id: number;
      tarjeta_activa: boolean;
      limite_disponible: number;
      transactions: any[];
      violaciones?: string[];
    }
  } = {};
  id: number = 0;
  comerciante: string = '';
  cantidad: number = 0;
  tiempo = '';
  activeButton : boolean = false;

  constructor(private http: HttpClient )
  {
    this.getAllTransaction();
  }

  ngOnInit(): void {
  }

  getAllTransaction() {
    this.http.get("http://localhost:3001/getAccounts").subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.accountsObject = resultData;
      },
      (error) => {
        console.error("Error while fetching accounts: ", error);
      }
    );
  }

  obtenerFechaYHora(){
    const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
    const hora = (document.getElementById('hora') as HTMLInputElement).value;
    this.tiempo = fecha + 'T' + hora;
    if(fecha && hora) this.activeButton=true
  }

  register()
  {
    let bodyData = {
      "transaccion":{
        "id" : this.id,
        "comerciante" : this.comerciante,
        "cantidad" : this.cantidad,
        "tiempo" : this.tiempo
      }

    };

    this.http.post("http://localhost:3001/authorizeTransaction",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registered Successfully")
        this.getAllTransaction();
    });
  }

  save(){
    this.register();
  }
}
