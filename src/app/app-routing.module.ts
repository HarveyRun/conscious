import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { TinyeditComponent } from "./tinyedit/tinyedit.component";
import { ExampleComponent } from "./example/example.component";

const routes: Routes = [{
  path: 'home', component: HomeComponent
},{
  path: 'edit', component: TinyeditComponent
},{
  path: 'exp', component: ExampleComponent
},{
  path: '**', redirectTo: 'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
