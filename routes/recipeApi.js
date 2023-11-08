import express from "express";
import myDB from "../db/MyDBRecipe.js";

let router = express.Router();

router.get("/get-recipe/:userID", async (req, res) => {
  const { userID } = req.params;
  const result = await myDB.getRecipes(userID);
  if (result.error) {
    return res.status(501).json(result);
  }
  res.json(result);
});


//creating and inserting new recipe
router.post("/create-recipe", async (req, res) => {
  const result = await myDB.createRecipe(req.body);
  console.log(result);
  if (result.error) {
    return res.status(503).json(result);
  }
  res.json(result);
});


//getting all recipe IDs that a user has liked or saved. (Favourites Page)
router.post("/update-like/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const { userId, isLiked } = req.body;

  try {
    // Log the data received from the frontend
    console.log("Received data from frontend:");
    console.log("Recipe ID:", recipeId);
    console.log("User ID:", userId);
    console.log("Is Liked:", isLiked);

    // Call the database method to update the liked status of the recipe
    const result = await myDB.updateLikedRecipes(recipeId, userId, isLiked);

    res.status(200).json({ message: "Recipe liked status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update recipe liked status" });
  }
});


//getting all recipes based on the user ID. (My Recipes Page)
router.get("/user-recipes", async (req, res) => {
  const { userId } = req.query; // Use query parameters to get the user ID
  const result = await myDB.getRecipesByUserId(userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

export default router;
