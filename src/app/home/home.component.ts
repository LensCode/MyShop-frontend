import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
       private changeDetectorRef: ChangeDetectorRef, 
       private media: MediaMatcher
       ) {
              this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
              this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
              this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit():void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
