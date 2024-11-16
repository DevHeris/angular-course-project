import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { ResolveFn } from '@angular/router';
import { Recipe } from './recipe.model';
import { inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const storageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  const recipes = recipeService.getRecipes();
  // Return cached recipes if available, otherwise fetch from server
  return recipes.length
    ? of(recipes)
    : storageService.fetchRecipes().pipe(
        catchError((error) => {
          console.error('Error fetching recipes:', error);
          return of([]); // Return an empty array if an error occurs
        })
      );
  // returns an Observable<Recipe[]>
  // you do not need to manually subscribe to it.
  // When Angular's router sees that this resolver is attached to a route, it will automatically subscribe to fetchRecipes(), wait for it to complete, and then pass the resolved data to the component.
};
