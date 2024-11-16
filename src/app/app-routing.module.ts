import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipesResolver } from './features/recipes/recipes.resolver';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { recipes: recipesResolver },
    children: [
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipes: recipesResolver },
      },
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
