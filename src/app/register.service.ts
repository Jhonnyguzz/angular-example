import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'

import { MessageService } from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URL = "http://localhost:8000";

  constructor(private messageService: MessageService,
    private httpClient: HttpClient,
    private router: Router) { }

    register(username: String, password: String, first_name: String, last_name: String, email: String): Observable<any> {  
      this.messageService.add('RegisterService: Login call');
      var obj = { username: username, password: password, first_name: first_name, last_name: last_name, email: email }
      return of(this.httpClient.post(this.API_URL + '/gallery/addUser', JSON.stringify(obj), httpOptions).subscribe((data:  Response) => {
         if(data[0].fields.username==username) {
             this.router.navigate(['/gallery']);
             this.messageService.add('Usuario adicionado');
         } else {
          this.messageService.add('Usuario o contraseña incorrectos');
         }
        }));
    }  
}
