import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  recipeForm: FormGroup;
  id: string;
  editMode: boolean;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params.id;
        this.editMode = this.id === undefined ? false : true;
        this.initForm();
      },
    });
  }

  private initForm() {
    let recipe = this.editMode ? this.recipeService.getRecipe(+this.id) : null;

    const recipeName = recipe ? recipe.name : null;
    const recipeImageUrl = recipe ? recipe.imagePath : null;
    const recipeDescription = recipe ? recipe.description : null;

    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(
                ingredient.amount,
                Validators.compose([
                  Validators.required,
                  Validators.pattern('^[1-9]+[0-9]*$'),
                ])
              ),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, Validators.required),
      recipeImageUrl: new FormControl(recipeImageUrl, Validators.required),
      recipeDescription: new FormControl(
        recipeDescription,
        Validators.required
      ),
      recipeIngredients: recipeIngredients,
    });
  }

  get ingredientControls(): AbstractControl[] {
    return (this.recipeForm.get('recipeIngredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern('^[1-9]+[0-9]*$'),
          ])
        ),
      })
    );
  }

  onSubmit(): void {
    const { recipeName, recipeIngredients, recipeImageUrl, recipeDescription } =
      this.recipeForm.value;
    console.log(this.recipeForm.value);
    const recipe = new Recipe(
      recipeName,
      recipeImageUrl,
      recipeDescription,
      recipeIngredients
    );
    if (this.editMode) this.recipeService.updateRecipe(recipe, +this.id);
    else this.recipeService.addRecipe(recipe);
    this.recipeForm.reset();
    this.onCancel();
  }

  onCancel(): void {
    // JUST NAVIGATE AWAY (go up one level)
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('recipeIngredients') as FormArray).removeAt(index);
  }
}
