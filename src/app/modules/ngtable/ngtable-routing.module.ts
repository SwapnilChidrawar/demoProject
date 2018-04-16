import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgtableComponent } from './ngtable.component';

const routes: Routes = [
  {
    path: '',
    component: NgtableComponent,
    // canActivate: [ AuthGuard ],
    data: {
      title: 'Ng table demo',
      icon: 'icon-layout-cta-right',
      caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgtableRoutingModule { }
