import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from './all-products.model';
const TABLE_DATA = [
  {
    position: 1,
    product: {
      imagePath: '../../../../assets/img/images.jpg',
      name: 'T-shirt',
      category: 'S',
      color: 'Red',
    },
    status: 'Countinue selling',
    incoming: 1,
    available: 4,
  },
  {
    position: 2,
    product: {
      imagePath: '../../../../assets/img/yellow.jpg',
      name: 'T-shirt',
      category: 'M',
      color: 'yellow',
    },
    status: 'Countinue selling',
    incoming: 0,
    available: 5,
  },
  {
    position: 3,
    product: {
      imagePath: '../../../../assets/img/blue.jpg',
      name: 'T-shirt',
      category: 'L',
      color: 'blue',
    },
    status: 'Countinue selling',
    incoming: 2,
    available: 6,
  },
];
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'product',
    'status',
    'incoming',
    'available',
    'edit',
  ];
  dataSource = new MatTableDataSource<Inventory>(TABLE_DATA);
  selection = new SelectionModel<Inventory>(true, []);
  constructor() {}

  ngOnInit(): void {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onSelected() {
    console.log(this.selection.selected);
  }

  onFilter(filterString) {
    console.log(filterString);
  }
}
