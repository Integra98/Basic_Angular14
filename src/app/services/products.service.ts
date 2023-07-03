import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http"
import { Observable, catchError, delay, retry, tap, throwError } from "rxjs";
import { IProduct } from "../models/product";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn:'root'
})

export class ProductsService{
    products: IProduct[] = [];

    constructor(private http: HttpClient,
        private errorService: ErrorService){
        
    }

    getAllProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
            params: new HttpParams().append('limit', 25) 
        }).pipe(
            delay(200),
            retry(2), //Try again
            tap(products => this.products = products),
            catchError(this.errorHandler.bind(this))
        )
    }
    
    create(product: IProduct): Observable<IProduct>{
        return this.http.post<IProduct>('https://fakestoreapi.com/products', product).pipe(
            tap(prod => {
                
                this.products.push(prod);
                console.log('prod', this.products);
            })
        );

    }

    private errorHandler(error: HttpErrorResponse){
        this.errorService.handle(error.message)
        return throwError(() => error.message)
    }

}