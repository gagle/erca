import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BaseType, select, Selection } from 'd3';
import { SvgIcon, SvgPath } from './svg-icon';

@Component({
  selector: 'erca-svg-icon',
  exportAs: 'ercaSvgIcon',
  template: '',
  styleUrls: ['./svg-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErcaSvgIconComponent implements OnInit, OnChanges {
  @HostBinding('class.erca-svg-icon')
  readonly hostClass = true;

  @Input()
  icon!: SvgIcon;
  @Input()
  title = '';

  private svgSelection!: Selection<SVGSVGElement, SvgPath, HTMLElement, any>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.svgSelection = select<BaseType, SvgPath>(this.elementRef.nativeElement)
      .append('svg')
      .attr('class', 'svg');

    this.draw();
  }

  ngOnChanges(): void {
    if (this.svgSelection) {
      this.draw();
    }
  }

  private draw(): void {
    if (!this.svgSelection || !this.icon) {
      return;
    }

    this.svgSelection.attr(
      'viewBox',
      `0 0 ${this.icon.viewBox.width} ${this.icon.viewBox.height}`
    );

    this.drawSvgPaths(this.icon.paths || []);
    this.drawSvgTitle(this.title || '');
  }

  private drawSvgTitle(title: string): void {
    const svgTitle = this.svgSelection.selectAll('title').data([title]);

    svgTitle.exit().remove();

    svgTitle
      .enter()
      .append('title')
      .text(title);
  }

  // istanbul ignore next
  private drawSvgPaths(svgPaths: SvgPath[]): void {
    const path = this.svgSelection.selectAll('path').data(svgPaths);

    path.exit().remove();

    path
      .enter()
      .append('path')
      .attr('d', datum => datum.d || '')
      .attr('fill', datum => datum.fill || '')
      .attr('opacity', datum => datum.opacity || '');
  }
}
