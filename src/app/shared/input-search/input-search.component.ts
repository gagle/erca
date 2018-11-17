import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { debounceTime, filter, mapTo, tap } from 'rxjs/operators';
import { CLOSE_EXIT, SEARCH } from '../../icons';

export interface InputValues {
  original: string;
  displayed: string;
  value: string;
}

@Component({
  selector: 'erca-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErcaInputSearchComponent implements OnInit, OnChanges {
  private get searchControl(): AbstractControl {
    return this.searchForm.get('search')!;
  }

  @HostBinding('class.erca-input-search')
  readonly hostClass = true;

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  @Input()
  value: string | null = '';

  @Input()
  placeholder = '';
  @Input()
  enableBarcodeScanner = false;

  @Output()
  readonly onSearch = new EventEmitter<string>(true);
  @Output()
  readonly onBarcode = new EventEmitter<InputValues>(true);

  readonly searchIcon = SEARCH;
  readonly clearIcon = CLOSE_EXIT;

  readonly searchForm: FormGroup = this.formBuilder.group({
    search: ['']
  });

  private readonly debounceTimeMs = 300;
  private previousValue = '';
  private onClear$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Non-barcode input changes
    merge(
      // Debounce manual input changes
      this.searchControl.valueChanges.pipe<string>(
        debounceTime(this.debounceTimeMs)
      ),
      this.onClear$.pipe(mapTo(''))
    )
      .pipe(
        filter(value => this.previousValue !== value),
        tap(value => (this.previousValue = value))
      )
      .subscribe(value => {
        this.onSearch.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.value &&
      changes.value.previousValue !== changes.value.currentValue
    ) {
      this.searchControl.setValue(changes.value.currentValue);
    }
  }

  clear(): void {
    // Clear event should not be debounced, it should emit immediately
    this.searchControl.setValue('', { emitEvent: false });
    this.onClear$.next();
  }

  displayClearIcon(): boolean {
    return !!this.searchControl.value;
  }
}
