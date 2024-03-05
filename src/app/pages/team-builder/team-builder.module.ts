import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamBuilderPageRoutingModule } from './team-builder-routing.module';

import { TeamBuilderPage } from './team-builder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamBuilderPageRoutingModule
  ],
  declarations: [TeamBuilderPage]
})
export class TeamBuilderPageModule {}
