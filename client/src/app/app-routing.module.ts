import { OrderCategoryComponent } from './pages/order-page/order-category/order-category.component';
import { CategoriesEditComponent } from './pages/categiries-page/categories-edit/categories-edit.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { CategiriesPageComponent } from './pages/categiries-page/categiries-page.component';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import { OrderPositionComponent } from './pages/order-page/order-position/order-position.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent,
      },
      {
        path: 'history',
        component: HistoryPageComponent,
      },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          {
            path: '',
            component: OrderCategoryComponent,
          },
          {
            path: ':id',
            component: OrderPositionComponent,
          },
        ],
      },
      {
        path: 'categories',
        component: CategiriesPageComponent,
      },
      {
        path: 'categories/new',
        component: CategoriesEditComponent,
      },
      {
        path: 'categories/:id',
        component: CategoriesEditComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsPageComponent,
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
