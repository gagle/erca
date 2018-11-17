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
  public readonly hostClass = true;

  public navigating = false;
  public willNavigate = false;

  public readonly urlForm = this.formBuilder.group({
    url: null
  });

  private readonly homeUrl = '/';
  private isUrlFocused = false;
  private currentUrl = this.location.path();

  public constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  public ngOnInit(): void {
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

    this.router.events
      .pipe(filter(() => this.willNavigate))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.navigating = true;
        } else if (event instanceof RoutesRecognized) {
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError
        ) {
          this.navigating = false;
          this.willNavigate = false;
          this.urlControl.setValue(
            event instanceof NavigationEnd ? event.urlAfterRedirects : event.url
          );
        }
      });
  }

  @HostListener('document:keyup.enter')
  public onEnterKeyHandler(): void {
    if (this.isUrlFocused) {
      this.willNavigate = true;
      this.router.navigate([this.currentUrl]);
    }
  }

  public get url(): string {
    return this.currentUrl;
  }

  public back(): void {
    this.location.back();
  }

  public forward(): void {
    this.location.forward();
  }

  public reload(): void {
    if (this.document.location) {
      this.document.location.reload();
    }
  }

  public goHome(): void {
    this.router.navigate([this.homeUrl]);
  }

  public onFocusIn(): void {
    this.isUrlFocused = true;
  }

  public onFocusOut(): void {
    this.isUrlFocused = false;
  }
}
