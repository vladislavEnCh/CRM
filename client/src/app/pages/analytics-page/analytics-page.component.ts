import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { IAnalyticsPage } from 'src/app/shared/interfaces/interface';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef!: ElementRef;
  @ViewChild('order') orderRef!: ElementRef;

  aSub!: Subscription;
  average!: number;
  pending = true;

  constructor(private service: AnalyticsService) {}

  ngAfterViewInit() {
    Chart.register(...registerables);
    const gainConfig: any = {
      label: 'revenue',
      color: 'rgb(255, 99, 132)',
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
    };

    this.aSub = this.service
      .getAnalytics()
      .subscribe((data: IAnalyticsPage) => {
        this.average = data.average;

        gainConfig.labels = data.chart.map((item) => item.label);
        gainConfig.data = data.chart.map((item) => item.gain);

        orderConfig.labels = data.chart.map((item) => item.label);
        orderConfig.data = data.chart.map((item) => item.order);

        // **** Gain ****
        // gainConfig.labels.push('08.05.2018');
        // gainConfig.labels.push('09.05.2018');
        // gainConfig.data.push(1500);
        // gainConfig.data.push(700);
        // // **** /Gain ****

        // // **** Order ****
        // orderConfig.labels.push('08.05.2018');
        // orderConfig.labels.push('09.05.2018');
        // orderConfig.data.push(8);
        // orderConfig.data.push(2);
        // **** /Order ****

        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';
        orderCtx.canvas.height = '300px';

        new Chart(gainCtx, createChartConfig(gainConfig));
        new Chart(orderCtx, createChartConfig(orderConfig));

        this.pending = false;
      });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

function createChartConfig({ labels, data, label, color }: any): any {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
