import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: ':id', component: RecipeDetailComponent },
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
