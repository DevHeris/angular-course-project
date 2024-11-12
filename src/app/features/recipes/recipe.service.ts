import { inject, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeEditComponent } from '../../recipes/recipe-edit/recipe-edit.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private shoppinglistService = inject(ShoppingListService);

  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg',
      'Crispy, breaded chicken schnitzel served with fries and a side salad.',
      [
        new Ingredient('Chicken Breast', 1),
        new Ingredient('Breadcrumbs', 200),
        new Ingredient('Eggs', 2),
        new Ingredient('Flour', 100),
        new Ingredient('Fries', 200),
        new Ingredient('Lettuce', 1),
        new Ingredient('Tomato', 2),
        new Ingredient('Cucumber', 1),
      ]
    ),
    new Recipe(
      'Spaghetti Bolognese',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      'Classic Italian pasta with a rich meat sauce.',
      [
        new Ingredient('Spaghetti', 500),
        new Ingredient('Ground Beef', 400),
        new Ingredient('Tomato Sauce', 500),
        new Ingredient('Onion', 1),
        new Ingredient('Garlic', 2),
        new Ingredient('Olive Oil', 2),
        new Ingredient('Parmesan Cheese', 100),
      ]
    ),
    new Recipe(
      'Greek Salad',
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      'Fresh salad with cucumber, tomato, olives, feta cheese, and a drizzle of olive oil.',
      [
        new Ingredient('Cucumber', 1),
        new Ingredient('Tomatoes', 3),
        new Ingredient('Feta Cheese', 200),
        new Ingredient('Olives', 100),
        new Ingredient('Red Onion', 1),
        new Ingredient('Olive Oil', 2),
        new Ingredient('Oregano', 1),
      ]
    ),
    new Recipe(
      'Chocolate Cake',
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
      'A moist, rich chocolate cake with dark chocolate glaze.',
      [
        new Ingredient('Flour', 200),
        new Ingredient('Cocoa Powder', 100),
        new Ingredient('Sugar', 250),
        new Ingredient('Butter', 200),
        new Ingredient('Eggs', 3),
        new Ingredient('Dark Chocolate', 200),
      ]
    ),
    new Recipe(
      'Pancakes with Berries',
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      'Fluffy pancakes topped with fresh strawberries, blueberries, and syrup.',
      [
        new Ingredient('Flour', 200),
        new Ingredient('Milk', 300),
        new Ingredient('Eggs', 2),
        new Ingredient('Butter', 50),
        new Ingredient('Sugar', 50),
        new Ingredient('Strawberries', 100),
        new Ingredient('Blueberries', 100),
        new Ingredient('Maple Syrup', 50),
      ]
    ),
  ];

  recipeUpdated = new BehaviorSubject<Recipe[]>(this.recipes);

  getRecipes(): Recipe[] {
    // THE SLICE IS SO THE ACTUAL RECIPE ARRAY ISN'T GIVEN OUT BUT JUST A COPY OF IT
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeUpdated.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe, index: number): void {
    this.recipes[index] = updatedRecipe;
    this.recipeUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeUpdated.next(this.recipes.slice());
  }

  onAddToShoppingList(ingredients: Ingredient[]): void {
    this.shoppinglistService.addIngredients(ingredients);
  }
}
