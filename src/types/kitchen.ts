export interface Ingredient {
  name: string;
  quantity?: string;
  daysUntilExpiry?: number;
}

export type CookingTime = 15 | 30 | 60;
export type CookingTool = "stove" | "microwave" | "oven" | "air fryer";
export type DietaryPreference = "vegetarian" | "vegan" | "high-protein" | "low-carb" | "gluten-free";

export interface Constraints {
  cookingTime: CookingTime;
  tools: CookingTool[];
  dietary: DietaryPreference[];
  exclusions: string[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  cookingTime: number;
  tools: CookingTool[];
  diet: DietaryPreference[];
  steps: string[];
  tips?: string[];
  imageEmoji: string;
}

export interface ScoredRecipe extends Recipe {
  score: number;
  matchedIngredients: string[];
  missingIngredients: { name: string; amount: string }[];
  urgencyBoost: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
