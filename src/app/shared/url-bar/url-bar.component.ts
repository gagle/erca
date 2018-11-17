import { DOCUMENT, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RoutesRecognized
} from '@angular/router';
import { filter, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'erca-url-bar',
  templateUrl: './url-bar.component.html',
  styleUrls: ['./url-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ErcaUrlBarComponent implements OnInit {
  private get urlControl(): AbstractControl {
    return this.urlForm.get('url')!;
  }

  @HostBinding('class.erca-url-bar')
  readonly hostClass = true;

  navigating = false;

  readonly urlForm = this.formBuilder.group({
    url: null
  });

  private readonly homeUrl = '/';
  private isUrlFocused = false;
  private currentUrl = this.location.path();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.urlControl.setValue(this.location.path() || this.homeUrl);

    this.location.subscribe(event => {
      this.urlControl.setValue(event.url);
    });

    this.urlControl.valueChanges
      .pipe(
        startWith(
          this.document.location
            ? this.document.location.hash.substring(1)
            : this.homeUrl
        ),
        tap(url => {
          if (!url) {
            this.urlControl.setValue(this.homeUrl);
          }
        }),
        filter(url => !!url)
      )
      .subscribe(url => {
        this.currentUrl = url;
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navigating = true;
      } else if (event instanceof RoutesRecognized) {
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.navigating = false;
        this.urlControl.setValue(
          event instanceof NavigationEnd ? event.urlAfterRedirects : event.url
        );
      }
    });
  }

  @HostListener('document:keyup.enter')
  onEnterKeyHandler(): void {
    if (this.isUrlFocused) {
      this.router.navigate([this.currentUrl]);
    }
  }

  get url(): string {
    return this.currentUrl;
  }

  back(): void {
    this.location.back();
  }

  forward(): void {
    this.location.forward();
  }

  reload(): void {
    if (this.document.location) {
      this.document.location.reload();
    }
  }

  goHome(): void {
    this.router.navigate([this.homeUrl]);
  }

  onFocusIn(): void {
    this.isUrlFocused = true;
  }

  onFocusOut(): void {
    this.isUrlFocused = false;
  }
}
