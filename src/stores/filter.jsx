import { atom } from 'nanostores';

export const selectedIngredients = atom([]);

export function toggleIngredient(ingredient) {
  selectedIngredients.set(
    selectedIngredients.get().includes(ingredient)
      ? selectedIngredients.get().filter((i) => i !== ingredient)
      : [...selectedIngredients.get(), ingredient]
  );
}
