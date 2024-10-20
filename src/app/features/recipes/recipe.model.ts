import { Ingredient } from '../shared/ingredient.model';

// Recipe model
export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public imagePath: string,
    public description: string,
    public ingredients: Ingredient[]
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
    this.ingredients = ingredients;
  }
}
