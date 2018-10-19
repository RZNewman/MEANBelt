import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  {path: 'pets', component:MainComponent},
  {path: 'pets/new', component:NewComponent},
  {path: 'pets/:id/edit', component:EditComponent},
  {path: 'pets/:id', component:DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
