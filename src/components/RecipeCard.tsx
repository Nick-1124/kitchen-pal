import { ScoredRecipe } from "@/types/kitchen";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, Check, ShoppingCart, PlayCircle } from "lucide-react";

interface Props {
  recipe: ScoredRecipe;
  onStartCooking: (recipe: ScoredRecipe) => void;
  index: number;
}

export default function RecipeCard({ recipe, onStartCooking, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{recipe.imageEmoji}</span>
          <div>
            <h3 className="font-display font-semibold text-foreground leading-tight">{recipe.name}</h3>
            <p className="text-xs text-muted-foreground">{recipe.description}</p>
          </div>
        </div>
        {recipe.urgencyBoost > 0 && (
          <Badge variant="destructive" className="text-[10px] shrink-0">⏰ Uses expiring</Badge>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.cookingTime} min</span>
        <span>{recipe.tools.join(", ") || "No tools needed"}</span>
      </div>

      <div className="mb-3">
        <p className="text-[11px] font-medium text-muted-foreground mb-1">Matched ingredients</p>
        <div className="flex flex-wrap gap-1">
          {recipe.matchedIngredients.map((ing) => (
            <Badge key={ing} variant="secondary" className="text-[10px]">
              <Check className="h-2.5 w-2.5 mr-0.5" /> {ing}
            </Badge>
          ))}
        </div>
      </div>

      {recipe.missingIngredients.length > 0 && (
        <div className="mb-3">
          <p className="text-[11px] font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" /> Missing
          </p>
          <div className="flex flex-wrap gap-1">
            {recipe.missingIngredients.map((ing) => (
              <Badge key={ing.name} variant="outline" className="text-[10px]">
                {ing.name} ({ing.amount})
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button size="sm" className="w-full mt-1" onClick={() => onStartCooking(recipe)}>
        <PlayCircle className="h-4 w-4 mr-1.5" /> Start Cooking
      </Button>
    </motion.div>
  );
}
