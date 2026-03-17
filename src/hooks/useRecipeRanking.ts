import { useMemo } from "react";
import { Ingredient, Constraints, Recipe, ScoredRecipe } from "@/types/kitchen";
import { recipes } from "@/data/recipes";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function ingredientMatch(recipeIng: string, userIng: string): boolean {
  const r = normalize(recipeIng);
  const u = normalize(userIng);
  return r.includes(u) || u.includes(r);
}

export function useRecipeRanking(inventory: Ingredient[], constraints: Constraints) {
  return useMemo(() => {
    if (inventory.length === 0) return [];

    const userNames = inventory.map((i) => i.name.trim().toLowerCase());

    const scored: ScoredRecipe[] = recipes
      .map((recipe) => {
        // Constraint filtering
        if (recipe.cookingTime > constraints.cookingTime) return null;
        if (constraints.tools.length > 0 && recipe.tools.length > 0) {
          const hasRequiredTool = recipe.tools.some((t) => constraints.tools.includes(t));
          if (!hasRequiredTool) return null;
        }
        if (constraints.dietary.length > 0) {
          const meetsDiet = constraints.dietary.every((d) => recipe.diet.includes(d));
          if (!meetsDiet) return null;
        }
        // Exclusions
        if (constraints.exclusions.length > 0) {
          const hasExcluded = recipe.ingredients.some((ri) =>
            constraints.exclusions.some((ex) => ingredientMatch(ri.name, ex))
          );
          if (hasExcluded) return null;
        }

        // Scoring
        const matched: string[] = [];
        const missing: { name: string; amount: string }[] = [];

        recipe.ingredients.forEach((ri) => {
          const found = userNames.some((u) => ingredientMatch(ri.name, u));
          if (found) matched.push(ri.name);
          else missing.push(ri);
        });

        if (matched.length === 0) return null;

        const ingredientScore = (matched.length / recipe.ingredients.length) * 50;
        const wasteScore = inventory.reduce((sum, ing) => {
          const isUsed = matched.some((m) => ingredientMatch(m, ing.name));
          if (isUsed && ing.daysUntilExpiry !== undefined) {
            return sum + Math.max(0, 10 - ing.daysUntilExpiry);
          }
          return sum;
        }, 0);
        const missingPenalty = missing.length * 5;
        const score = ingredientScore + wasteScore - missingPenalty;

        return {
          ...recipe,
          score,
          matchedIngredients: matched,
          missingIngredients: missing,
          urgencyBoost: wasteScore,
        } as ScoredRecipe;
      })
      .filter(Boolean) as ScoredRecipe[];

    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [inventory, constraints]);
}
