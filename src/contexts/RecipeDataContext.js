import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);

export const RecipeDataProvider = ({children}) => {
    const [recipeData, setRecipeData] = useState({
        pageRecipe: {results: []},
        popularRecipes: {results: []},
    });

    const currentUser = useCurrentUser();
}