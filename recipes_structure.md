# Recipe File Structure

This README explains the structure of recipe files in our project. Each recipe is a Markdown file with frontmatter and specific content sections.

## File Location

Recipe files should be placed in the appropriate category folder within the `src/content/receta/` directory.

## Frontmatter

Each recipe file starts with frontmatter, delimited by triple dashes (`---`). The frontmatter contains metadata about the recipe in YAML format.

### Required Frontmatter Fields

```yaml
---
layout: ../../layouts/RecipeLayout.astro
slug: url-friendly-recipe-name
title: Recipe Title
extract: A brief description of the recipe for previews
category: desayuno | almuerzo | cena | snack
difficulty: facil | medio | dificil
ingredients:
  - ingredient 1
  - ingredient 2
  - ...
prepTime: preparation time
cookTime: cooking time
servings: number of servings
image: /path/to/recipe-image.jpg
---
```
