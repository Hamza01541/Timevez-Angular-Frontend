import { Component, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core';

export enum MonthEnum {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12,
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() datasets: any[] = [{
    month: 1,
    activeCount: 44,
    year: null,
    onBoardingCount: null,
    terminatedCount: null
  }];
  @Input() options = {
    legend: { position: 'none' },  // hide the legend
    colors: ['#63C6C0', '#FFB903', '#CA1A46'] // Colors for bar chart
  };

  data: any[];

  ngAfterViewInit() {
    this.initializeBarChart();
  }

  ngOnChanges() {
    this.initializeBarChart();
  }

  /**
   * Initialize bar-chart
   */
  initializeBarChart() {
    this.data = [
      ['Jan'],
      ['Feb'],
      ['Mar'],
      ['Apr'],
      ['May'],
      ['Jun'],
      ['Jul']
    ];

    if (this.datasets && this.datasets.length) {
      for (const dataset of this.datasets) {
        this.data[dataset.month - 1][0] = MonthEnum[dataset.month];
        this.data[dataset.month - 1].push(dataset.activeCount);
      }
    }

    this.data = [
      ['Jan', 65, 28, 38],
      ['Feb', 59, 48, 58],
      ['Mar', 80, 40, 20],
      ['Apr', 81, 19, 69],
      ['May', 56, 86, 56],
      ['Jun', 55, 27, 27],
      ['Jul', 40, 90, 80]
    ];
  }

  ngOnDestroy() {
  }
}
