import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
    ingredientsChanged = new BehaviorSubject<Ingredient[]>([]);

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 13),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
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
