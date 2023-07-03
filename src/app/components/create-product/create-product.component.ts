import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  constructor(private productsService: ProductsService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.title.valueChanges.subscribe((changes) => {
      console.log(changes, this.title);
    });
  }

  submit() {
    this.productsService.create({
      title: this.title.value as string,
      price: 23,
      description: 'loremvdfdwcfewcdwe',
      image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      category: 'some category',
    }).subscribe(res => {
      this.modalService.close();
    })
  }

  inputChange() {
    // console.log(this.title)
  }
}
