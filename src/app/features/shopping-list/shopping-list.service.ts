import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Bread', 6),
    new Ingredient('Sauce', 1),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    if (!ingredients) alert('No ingredient for this recipe!');

    //  * TOO MANY EVENTS WILL BE EMITTED WITH THIS METHOD (IT'S NOT NECESSARILY BAD THOUGH...)

    // for (let ingredient of ingredients) {
    //   this.addIngredient(new Ingredient(ingredient.name, ingredient.amount));
    // }

    // * SO WE USE THIS INSTEAD
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

    alert('Ingredients have been added to your shopping list!');
  }

  constructor() {}
}
