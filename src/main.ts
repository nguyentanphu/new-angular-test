import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  Component,
  Directive,
  NgModule,
  Input,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: 'img[ccRollover]'
})
class RolloverImageDirective implements OnInit {
  @Input('ccRollover')
  config: { initial: string; over: string };

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.src = this.config.initial;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    console.log(event);
    this.el.nativeElement.src = this.config.over;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    console.log(event);
    this.el.nativeElement.src = this.config.initial;
  }
}

@Component({
  selector: 'app',
  template: `
    <img
      [ccRollover]="{
        initial: 'https://unsplash.it/200/300?image=201',
        over: 'https://unsplash.it/200/300?image=202'
      }"
    />
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, RolloverImageDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
