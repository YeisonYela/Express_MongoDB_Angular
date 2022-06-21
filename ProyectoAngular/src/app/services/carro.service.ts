import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpHeaderResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";

@Injectable()
export class CarroService{
    public url: string;

    constructor(private http: HttpClient){
        this.url = GLOBAL.url;
    }
    
    agregarCarro({ carro, token }: { carro: any; token: any }){
        let params = JSON.stringify(carro);
        let headers = new HttpHeaders
        ({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.post(this.url + 'carro', params,{ headers: headers });
    }

    getCarros():Observable<any>{        
        return this.http.get(this.url+'carros');
    }

    getCarro(id: any):Observable<any>{        
        return this.http.get(this.url+'carro/' +id);
    }

    editarCarro({ token, id, carro }: {token: any; id: any; carro: any;  }){
        let params = JSON.stringify(carro);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this.http.put(this.url + 'carro/'+id, params,{ headers: headers });
    }

    deleteCarro({ token, id }: {token: any; id: any;  }){        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        
        let options = new HttpHeaderResponse({headers: headers});
        return this.http.delete(this.url+'carro/'+id, options)
    }
}

