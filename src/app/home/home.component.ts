import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;
  modal1Style: any;

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.modal1Style = {
      display: 'none'
    }


  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onOpenModal(e) {
    console.log(e);
    e.stopPropagation();


    if (e.type === 'mouseenter') {
      console.log('enter');

      this.modal1Style = {
        display: 'flex',
      }
    }
    else if (e.type === 'mouseleave') {
      console.log(e.srcElement.getBoundingClientRect());

      this.modal1Style = {
        display: 'none',
      }


    }

  }
  onCloseModal(e) {
    let pos = e.srcElement.getBoundingClientRect();

    console.log(e);
    this.modal1Style = {
      display: 'none',
      left: pos.left - 280 + 'px'

    }
  }


}
