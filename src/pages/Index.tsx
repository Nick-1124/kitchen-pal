import { useState } from "react";
import { Ingredient, Constraints, ScoredRecipe } from "@/types/kitchen";
import { useRecipeRanking } from "@/hooks/useRecipeRanking";
import InventoryPanel from "@/components/InventoryPanel";
import RecipePanel from "@/components/RecipePanel";
import ChatPanel from "@/components/ChatPanel";
import { ChefHat } from "lucide-react";

const defaultConstraints: Constraints = {
  cookingTime: 30,
  tools: [],
  dietary: [],
  exclusions: [],
};

export default function Index() {
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [constraints, setConstraints] = useState<Constraints>(defaultConstraints);
  const [selectedRecipe, setSelectedRecipe] = useState<ScoredRecipe | null>(null);

  const recipes = useRecipeRanking(inventory, constraints);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <ChefHat className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold leading-tight text-foreground">Kitchen AI</h1>
          <p className="text-[11px] text-muted-foreground -mt-0.5">Smart cooking assistant</p>
        </div>
      </header>

      {/* 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Inventory */}
        <div className="w-72 border-r border-border shrink-0 overflow-hidden bg-background">
          <InventoryPanel
            inventory={inventory}
            setInventory={setInventory}
            constraints={constraints}
            setConstraints={setConstraints}
          />
        </div>

        {/* Center: Recipes */}
        <div className="flex-1 overflow-hidden">
          <RecipePanel
            recipes={recipes}
            onSelectRecipe={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
          />
        </div>

        {/* Right: Chat */}
        <div className="w-80 border-l border-border shrink-0 overflow-hidden">
          <ChatPanel
            selectedRecipe={selectedRecipe}
            inventory={inventory.map((i) => i.name)}
          />
        </div>
      </div>
    </div>
  );
}
