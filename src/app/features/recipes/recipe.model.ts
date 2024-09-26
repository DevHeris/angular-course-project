// Recipe model
export class Recipe {
  public name: string;
  public imagePath: string;
  public description: string;

  constructor(name: string, imagePath: string, description: string) {
    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
  }
}
