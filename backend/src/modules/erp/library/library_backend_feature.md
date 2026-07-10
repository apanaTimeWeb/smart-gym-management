# Library Module

## Overview
The Library module manages the reference data for workouts and diets. It serves as a centralized dictionary that trainers and members can pull from to build out daily routines.

## Entities
- `Exercise`: A single movement (e.g. Bench Press) with its mechanics and video reference.
- `DietPlan`: A pre-built nutritional template with meals and macros.

## Key Features
- **Categorization**: Exercises are tagged by muscle group, category, and difficulty.
- **Diet Macros**: Standardized diet plans have total macros (calories, protein, carbs, fats) pre-calculated.
- **Reusable**: These entities are designed to be linked to user-specific workout routines or meal assignments.
