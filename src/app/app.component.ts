import { Component } from '@angular/core';
import { slider } from './app.animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent {
 visible = false;
 fillerNav=['item1','item2','item3','item4'];
}
