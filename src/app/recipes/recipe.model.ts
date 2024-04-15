import { Ingredients } from "../shared/ingredients.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredient : Ingredients[]
    constructor(name: string, description: string, imagePath: string, ingredient: Ingredients[])
    {        
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredient=ingredient;
    }
}