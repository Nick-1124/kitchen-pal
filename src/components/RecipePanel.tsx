import { ScoredRecipe } from "@/types/kitchen";
import RecipeCard from "./RecipeCard";
import CookingMode from "./CookingMode";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  recipes: ScoredRecipe[];
  onSelectRecipe: (r: ScoredRecipe | null) => void;
  selectedRecipe: ScoredRecipe | null;
}

export default function RecipePanel({ recipes, onSelectRecipe, selectedRecipe }: Props) {
  if (selectedRecipe) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => onSelectRecipe(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <span className="text-lg">{selectedRecipe.imageEmoji}</span>
          <h2 className="font-display font-semibold text-foreground">{selectedRecipe.name}</h2>
        </div>
        <CookingMode recipe={selectedRecipe} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-thin">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-display font-semibold text-foreground">Recommended Recipes</h2>
      </div>

      {recipes.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-sm">Add ingredients to your kitchen to see recipe suggestions</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {recipes.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} onStartCooking={onSelectRecipe} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
