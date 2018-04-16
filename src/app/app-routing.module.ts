import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';


import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'schema',
        loadChildren: './modules/forms/q-forms.module#QFormsModule'
      },

      {
        path: 'es',
        loadChildren: './modules/es/es.module#EsModule'
      },
      {
        path: 'ngtable',
        loadChildren: './modules/ngtable/ngtable.module#NgtableModule'
      },
      {
        path: 'navigation',
        loadChildren: './theme/navigation/navigation.module#NavigationModule'
      },
      {
        path: 'widget',
        loadChildren: './theme/widget/widget.module#WidgetModule'
      },
      {
        path: 'basic',
        loadChildren: './theme/ui-elements/basic/basic.module#BasicModule'
      },
      {
        path: 'advance',
        loadChildren: './theme/ui-elements/advance/advance.module#AdvanceModule'
      },
      {
        path: 'animations',
        loadChildren: './theme/ui-elements/animation/animation.module#AnimationModule'
      },
      {
        path: 'forms',
        loadChildren: './theme/forms/forms.module#FormsModule'
      },
      {
        path: 'bootstrap-table',
        loadChildren: './theme/table/bootstrap-table/bootstrap-table.module#BootstrapTableModule'
      },
      {
        path: 'data-table',
        loadChildren: './theme/table/data-table/data-table.module#DataTableModule'
      },
      {
        path: 'maintenance/error',
        loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      },
      {
        path: 'maintenance/coming-soon',
        loadChildren: './theme/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      },
      {
        path: 'user',
        loadChildren: './theme/user/user.module#UserModule'
      },
      {
        path: 'task',
        loadChildren: './theme/task/task.module#TaskModule'
      },
      {
        path: 'invoice',
        loadChildren: './theme/extension/invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'file-upload-ui',
        loadChildren: './theme/extension/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      },
      {
        path: 'charts',
        loadChildren: './theme/chart/chart.module#ChartModule'
      },
      {
        path: 'map',
        loadChildren: './theme/map/map.module#MapModule'
      },
      {
        path: 'simple-page',
        loadChildren: './theme/simple-page/simple-page.module#SimplePageModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './theme/auth/auth.module#AuthModule'
      },
      {
        path: 'maintenance/offline-ui',
        loadChildren: './theme/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
