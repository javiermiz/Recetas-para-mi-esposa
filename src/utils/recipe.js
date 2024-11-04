import { getCollection } from 'astro:content';

export async function getAllRecipes() {
  const recipes = await getCollection('receta');
  console.log(recipes, 'hello');
  return recipes;
}

export async function getRecipeBySlug(slug) {
  const recipes = await getCollection('receta');
  return recipes.find((recipe) => recipe.slug === slug);
}

export async function getRecommendedRecipes() {
  const recipes = await getAllRecipes();
  const hour = new Date().getHours();
  let category;
  if (hour >= 5 && hour < 11) category = 'desayuno';
  else if (hour >= 11 && hour < 15) category = 'almuerzo';
  else if (hour >= 15 && hour < 22) category = 'cena';
  else category = 'snack';

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.data.category === category
  );
  return filteredRecipes.sort(() => 0.5 - Math.random()).slice(0, 3);
}
