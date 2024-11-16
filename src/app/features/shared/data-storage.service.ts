import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private http = inject(HttpClient);
  private recipeService = inject(RecipeService);

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        'https://ng-recipe-book-a708a-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-a708a-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe: Recipe) => {
            return recipe.ingredients ? recipe : { ...recipe, ingredients: [] };
          });
        }),
        tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
      );
  }
}
