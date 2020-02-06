import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, filter, first, map, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProductService {

    products=new BehaviorSubject<Array<any>>([]);

    constructor(private httpClient: HttpClient) {

    }

    objectToFormData(object: any): HttpParams {
        let httpParams = new HttpParams();
        let keys = Object.keys(object);
        keys.forEach(key => {
            httpParams = httpParams.append(key, object[key]);
        });
        return httpParams;
    }

    subscribeToProducts(){
        return this.products.asObservable();
    }

    get(query) {
       /* let httpParams = this.objectToFormData(query);
        this.httpClient.get(AppConfig.settings.products.get, { params: httpParams }).pipe(map(response => response)).subscribe( (data:Array<Product>) =>{
            this.products.next(data);
        });*/
    }


}
