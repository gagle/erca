import { DOCUMENT, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
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
import { IpcMessageEvent, ipcRenderer } from 'electron';
import { SubscriptionLike } from 'rxjs';
import { filter, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'erca-url-bar',
  templateUrl: './url-bar.component.html',
  styleUrls: ['./url-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ErcaUrlBarComponent implements OnInit, OnDestroy {
  get url(): string {
    return this.currentUrl;
  }

  get isBackButtonEnabled(): boolean {
    return (
      !this.isNavigating && this.historyStack && this.historyStack.length > 1
    );
  }

  get isForwardButtonEnabled(): boolean {
    return !this.isNavigating && !!this.backNavigatedUrls.length;
  }

  get isHomeButtonEnabled(): boolean {
    return !this.isNavigating;
  }

  private get urlControl(): AbstractControl {
    return this.urlForm.get('url')!;
  }

  @HostBinding('class.erca-url-bar')
  readonly hostClass = true;

  readonly urlForm = this.formBuilder.group({
    url: null
  });

  isNavigating = false;

  private locationSubscription!: SubscriptionLike;
  private readonly homeUrl = '/';
  private isUrlFocused = false;
  private currentUrl = this.location.path();
  private historyStack!: string[];
  private backNavigatedUrls: string[] = [];
  private initialRouterEventsUrls: string[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private changeDetector: ChangeDetectorRef
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
        this.isNavigating = true;
      } else if (event instanceof RoutesRecognized) {
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.isNavigating = false;
        const url =
          event instanceof NavigationEnd ? event.urlAfterRedirects : event.url;

        this.updateHistoryStack(url);

        this.urlControl.setValue(url);
      }
    });

    ipcRenderer.send('history-load');
    ipcRenderer.on(
      'history-loaded',
      (event: IpcMessageEvent, historyStack: string[]) => {
        this.historyStack = historyStack;
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  @HostListener('document:keyup.enter')
  onEnterKeyHandler(): void {
    if (this.isUrlFocused) {
      this.router.navigate([this.currentUrl]);
    }
  }

  back(): void {
    const url = this.historyStack.shift() as string;
    ipcRenderer.send('history-update', this.historyStack);
    this.backNavigatedUrls.push(url);
    this.router.navigate([this.historyStack[0]], {
      skipLocationChange: true
    });
  }

  forward(): void {
    const url = this.backNavigatedUrls.pop() as string;
    this.router.navigate([url], {
      skipLocationChange: true
    });
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

  private updateHistoryStack(url: string): void {
    if (url === this.backNavigatedUrls[this.backNavigatedUrls.length - 1]) {
      this.backNavigatedUrls = [];
    }

    if (this.historyStack) {
      if (this.initialRouterEventsUrls.length) {
        this.historyStack = this.removeDuplicateUrls([
          url,
          ...this.initialRouterEventsUrls
        ]);
        ipcRenderer.send('history-update', this.historyStack);
        this.initialRouterEventsUrls = [];
      } else if (url !== this.historyStack[0]) {
        this.historyStack.unshift(url);
        ipcRenderer.send('history-update', this.historyStack);
      }
    } else {
      this.initialRouterEventsUrls.unshift(url);
    }
  }

  private removeDuplicateUrls(urls: string[]): string[] {
    return Array.from(new Set(urls));
  }
}
