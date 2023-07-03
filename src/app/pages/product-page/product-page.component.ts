import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  products$: Observable<IProduct[]>
  loading = false;
  term ='';

  constructor(public productsService: ProductsService, public modalService: ModalService){}

  ngOnInit() {
    this.loading = true;
    // this.products$ = this.productsService.getAllProducts().pipe(
    //   tap(() => this.loading = false)
    // )

    this.productsService.getAllProducts().subscribe(res => {
      // this.products = res;
      this.loading = false;
    })
  }
}
