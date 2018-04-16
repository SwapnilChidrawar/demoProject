import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtableRoutingModule } from './ngtable-routing.module';
import { NgtableComponent } from './ngtable.component';
import { SharedModule } from '../../shared/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgtableService } from './ngtable.service';

import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgtableRoutingModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule
  ],
  providers: [NgtableService],
  declarations: [NgtableComponent]
})
export class NgtableModule { }
