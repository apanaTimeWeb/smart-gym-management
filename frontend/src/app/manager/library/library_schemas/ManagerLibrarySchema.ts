import { z } from 'zod';

export const dietMealSchema = z.object({
  time: z.string().optional(),
  name: z.string().optional(),
  calories: z.number().optional(),
  foods: z.array(z.string()).optional() });

export const dietPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  goal: z.string(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  description: z.string().optional(),
  meals: z.array(z.union([z.string(), dietMealSchema])),
  isActive: z.boolean() });

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  muscleGroup: z.array(z.string()).optional(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(),
  difficulty: z.string(),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isActive: z.boolean() });
