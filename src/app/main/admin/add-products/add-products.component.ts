import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface eventObject {
  checked: boolean;
  source: {
    id: string;
  };
}
interface Food {
  value: string;
  viewValue: string;
}
interface Options {
  id: number;
}
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  public show: boolean = false;
  public showVariants: boolean = false;
  public optionNo: number = 1;
  public optionsCounter: number = 1;

  foo(e) {
    e.preventDefault();
  }
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  optionArray: Options[] = [{ id: 1 }];
  ngOnInit(): void {}

  addMoreVariant() {
    this.optionArray.push({ id: ++this.optionsCounter });
  }
  removeVariantElement(e) {
    e.preventDefault();
    this.optionArray = this.optionArray
      .filter(({ id }: { id: number }) => id !== +e.srcElement.id)
      .map((item, index: number) => {
        item.id = index + 1;
        return item;
      });
    this.optionsCounter = this.optionArray.length;
  }
  toggle(e: eventObject) {
    if (e.source.id === 'variantsContent') {
      this.showVariants = e.checked;
    }
    if (e.source.id === 'trackContent') {
      this.show = e.checked;
    }
  }
}
