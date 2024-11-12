import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private shoppinglistService = inject(ShoppingListService);
  private igChangedSubscription: Subscription;
  ingredients: Ingredient[];

  constructor() {}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChangedSubscription =
      this.shoppinglistService.ingredientsChanged.subscribe({
        next: (ingredients: Ingredient[]) => (this.ingredients = ingredients),
      });
  }

  onEditItem(index: number): void {
    this.shoppinglistService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }
}
