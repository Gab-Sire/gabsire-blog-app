import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }, { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
