import { Component, inject, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  private shoppinglistService = inject(ShoppingListService);

  ingredients: Ingredient[];

  constructor() {}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();

    this.shoppinglistService.ingredientsChanged.subscribe({
      next: (ingredients: Ingredient[]) => (this.ingredients = ingredients),
    });
  }
}
