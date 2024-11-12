import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm', { static: true }) form: NgForm;
  // STATIC TRUE IS USED SINCE I DIDN'T DECIDE TO USE THE FORM IN NGAFTERVIEWINIT HOOK
  private shoppinglistService = inject(ShoppingListService);
  private startedEditingSubscription: Subscription;

  editedIngredient: Ingredient;
  editMode: boolean;
  editedItemIndex: number;

  ngOnInit(): void {
    this.editMode = false;
    this.startedEditingSubscription =
      this.shoppinglistService.startedEditing.subscribe({
        next: (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedIngredient = this.shoppinglistService.getIngredient(index);
          this.form.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          });
        },
      });
  }

  onSubmitItem(): void {
    const { name, amount } = this.form.value;
    if (name === '' || amount === '') return;
    if (this.editMode)
      this.shoppinglistService.updateIngredient(this.editedItemIndex, {
        name,
        amount,
      });
    else
      this.shoppinglistService.addIngredient(
        new Ingredient(name, Number(amount))
      );
    this.editMode = false;
    this.form.reset();
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }
}
