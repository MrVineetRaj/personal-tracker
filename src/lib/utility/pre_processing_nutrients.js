const preProcessingNutrients = (meal) => {
  let nutrients = {
    calories: 0,
    serving_size_g: 0,
    protein_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    cholesterol_mg: 0,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
  };

  meal?.breakfast?.forEach((food) => {
    nutrients.calories += food.calories;
    nutrients.serving_size_g += food.serving_size_g;
    nutrients.protein_g += food.protein_g;
    nutrients.sodium_mg += food.sodium_mg;
    nutrients.potassium_mg += food.potassium_mg;
    nutrients.cholesterol_mg += food.cholesterol_mg;
    nutrients.carbohydrates_total_g += food.carbohydrates_total_g;
    nutrients.fiber_g += food.fiber_g;
    nutrients.sugar_g += food.sugar_g;
  });

  meal?.lunch?.forEach((food) => {
    nutrients.calories += food.calories;
    nutrients.serving_size_g += food.serving_size_g;
    nutrients.protein_g += food.protein_g;
    nutrients.sodium_mg += food.sodium_mg;
    nutrients.potassium_mg += food.potassium_mg;
    nutrients.cholesterol_mg += food.cholesterol_mg;
    nutrients.carbohydrates_total_g += food.carbohydrates_total_g;
    nutrients.fiber_g += food.fiber_g;
    nutrients.sugar_g += food.sugar_g;
  });

  meal?.dinner?.forEach((food) => {
    nutrients.calories += food.calories;
    nutrients.serving_size_g += food.serving_size_g;
    nutrients.protein_g += food.protein_g;
    nutrients.sodium_mg += food.sodium_mg;
    nutrients.potassium_mg += food.potassium_mg;
    nutrients.cholesterol_mg += food.cholesterol_mg;
    nutrients.carbohydrates_total_g += food.carbohydrates_total_g;
    nutrients.fiber_g += food.fiber_g;
    nutrients.sugar_g += food.sugar_g;
  });

  meal?.snacks?.forEach((food) => {
    nutrients.calories += food.calories;
    nutrients.serving_size_g += food.serving_size_g;
    nutrients.protein_g += food.protein_g;
    nutrients.sodium_mg += food.sodium_mg;
    nutrients.potassium_mg += food.potassium_mg;
    nutrients.cholesterol_mg += food.cholesterol_mg;
    nutrients.carbohydrates_total_g += food.carbohydrates_total_g;
    nutrients.fiber_g += food.fiber_g;
    nutrients.sugar_g += food.sugar_g;
  });

  nutrients.calories = nutrients.calories.toFixed(2);
  nutrients.serving_size_g = nutrients.serving_size_g.toFixed(2);
  nutrients.protein_g = nutrients.protein_g.toFixed(2);
  nutrients.sodium_mg = nutrients.sodium_mg.toFixed(2);
  nutrients.potassium_mg = nutrients.potassium_mg.toFixed(2);
  nutrients.cholesterol_mg = nutrients.cholesterol_mg.toFixed(2);
  nutrients.carbohydrates_total_g = nutrients.carbohydrates_total_g.toFixed(2);
  nutrients.fiber_g = nutrients.fiber_g.toFixed(2);
  nutrients.sugar_g = nutrients.sugar_g.toFixed(2);

  return nutrients;
};

export default preProcessingNutrients;
