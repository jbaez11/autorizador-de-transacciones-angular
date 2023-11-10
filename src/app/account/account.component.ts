import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

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
  id: number = 0;
  tarjeta_activa: boolean = false;
  limite_disponible: number = 0;
  transactions : any[]=[];

  constructor(private accountService: AccountService)
  {
    this.getAllAccounts();
  }

  ngOnInit(): void {
  }

  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.accountsObject = resultData;
      },
      (error) => {
        console.error("Error while fetching accounts: ", error);
      }
    );
  }

  register() {
    this.accountService.registerAccount(this.id, this.limite_disponible, this.tarjeta_activa).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Registered Successfully");
      this.getAllAccounts();
    });
  }

  save(){
    this.register();
  }
}
