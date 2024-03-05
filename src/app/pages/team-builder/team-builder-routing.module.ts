import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamBuilderPage } from './team-builder.page';

const routes: Routes = [
  {
    path: '',
    component: TeamBuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamBuilderPageRoutingModule {}
