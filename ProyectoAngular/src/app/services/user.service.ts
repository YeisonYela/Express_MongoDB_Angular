import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";

@Injectable()
export class UserService{
    public url: string;
    public gettoken: | any ;
    public identity: | any ;
    public token: | any ;

    constructor(private http: HttpClient){
        this.url = GLOBAL.url;
    }
    register({ user }: { user: any; }): Observable<any>{
        let json = JSON.stringify(user);
          let params = json;
        //  console.log(params);
          let headers = new HttpHeaders().set('Content-Type','application/json');
          return this.http.post(this.url+'register', params, {headers:headers});    
    }

    singup({ user, gettoken}: { user:any; gettoken?: null | any; }): Observable<any>{
      if(gettoken != null){
        user.gettoken = gettoken;
        }else if(user.gettoken)
          {
            user.gettoken = null;
          }
      let params = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.url+'login', params, {headers:headers});
    }

    getIdentity(){
      this.identity = JSON.parse(localStorage.getItem('identity') || '{}');

      if(this.identity != "undefined"){
            
      }else{
        this.identity = null;
      }

      return this.identity;
    }
  
    getToken(){
      let token = localStorage.getItem('token');

      if(token != "undefined"){
        this.token = token;
      }else{
        this.token = null;
      }

      return this.token;
    }

    updateUser({ user }: { user: any }){
      let params = JSON.stringify(user);
      let headers = new HttpHeaders
        ({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      });
        
      return this.http.put(this.url + 'update-user/'+ user._id, params,{ headers: headers });
    }

    getEmpleados():Observable<any>{        
      return this.http.get(this.url+'empleados');
  }
}
