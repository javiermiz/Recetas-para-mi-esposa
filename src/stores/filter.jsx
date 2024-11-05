import { atom } from 'nanostores';

export const selectedIngredients = atom([]);
export const selectedCategory = atom(null);

export function toggleIngredient(ingredient) {
  selectedIngredients.set(
    selectedIngredients.get().includes(ingredient)
      ? selectedIngredients.get().filter((i) => i !== ingredient)
      : [...selectedIngredients.get(), ingredient]
  );
}

export function setCategory(category) {
  selectedCategory.set(category);
}
