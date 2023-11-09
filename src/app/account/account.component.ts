import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  accountsObject: {
    [key: string]: {
      id: number;
      tarjeta_activa: boolean;
      limite_disponible: number;
      transactions: any[];
      violaciones?: string[];
    }
  } = {};
  isResultLoaded=false;
  id: number = 0;
  tarjeta_activa: boolean = false;
  limite_disponible: number = 0;
  transactions : any[]=[];

  constructor(private http: HttpClient )
  {
    this.getAllAccounts();
  }

  ngOnInit(): void {
  }

  getAllAccounts() {
    this.http.get("http://localhost:3001/getAccounts").subscribe(
      (resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.accountsObject = resultData;
      },
      (error) => {
        console.error("Error while fetching accounts: ", error);
      }
    );
  }

  register()
  {
    let bodyData = {
      "cuenta":{
        "id" : this.id,
        "limite_disponible" : this.limite_disponible,
        "tarjeta_activa" : this.tarjeta_activa,
      }

    };

    this.http.post("http://localhost:3001/createAccount",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registered Successfully")
        this.getAllAccounts();
    });
  }

  save(){
    this.register();
  }
}
