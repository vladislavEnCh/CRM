export interface IUser {
  email: string;
  password: string;
}
export interface ICategories {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface IPosition {
  name: string;
  cost: number;
  categoty: string;
  user?: string;
  _id?: string;
  quantity: number;
}

export interface IOrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface IOrder {
  date?: Date;
  order?: number;
  user?: string;
  list: IOrderPosition[];
  _id?: string;
}

export interface IFilter {
  start?: Date;
  end?: Date;
  order?: number;
}
export interface IOverviewPage {
  orders: IOverviewPageItem;
  gain: IOverviewPageItem;
}
export interface IOverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}

export interface IAnalyticsPage {
  average: number;
  chart: IAnalyticsChartItem[];
}

export interface IAnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
}
