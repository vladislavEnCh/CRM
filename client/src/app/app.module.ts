import { CategiriesService } from './shared/services/categories.service';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterseptor } from './shared/interseptors/auth.interseptor';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { CategiriesPageComponent } from './pages/categiries-page/categiries-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesEditComponent } from './pages/categiries-page/categories-edit/categories-edit.component';
import { PositionComponent } from './pages/categiries-page/categories-edit/position/position.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderCategoryComponent } from './pages/order-page/order-category/order-category.component';
import { OrderPositionComponent } from './pages/order-page/order-position/order-position.component';
import { FilterComponent } from './pages/history-page/filter/filter.component';
import { ListComponent } from './pages/history-page/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    OverviewPageComponent,
    HistoryPageComponent,
    AnalyticsPageComponent,
    OrderPageComponent,
    CategiriesPageComponent,
    LoaderComponent,
    CategoriesEditComponent,
    PositionComponent,
    OrderCategoryComponent,
    OrderPositionComponent,
    FilterComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginPageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor,
    },
    CategiriesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
