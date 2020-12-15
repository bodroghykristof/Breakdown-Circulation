import React, { useState, useContext, useEffect } from "react";
import ResultContainer from "./ResultContainer";
import { AllCocktailsContext } from "./AllCocktailsContext";

export const SearchCocktails = () => {
    const [allCocktails] = useContext(AllCocktailsContext);
    const [resultsByIngredient, setResultsByIngredient] = useState([]);
    const [alcoholicCocktails, setAlcoholicCocktails] = useState([]);
    const [nonAlcoholicCocktails, setNonAlcoholicCocktails] = useState([]);

    const hasIngredient = (cocktail, searchedIngredient) => {
        for (let i = 1; i <= 15; i++) {
            const key = `strIngredient${i.toString()}`;
            if (cocktail[key] === null) {
                return false;
            } else if (
                cocktail[key].toLowerCase() === searchedIngredient.toLowerCase()
            ) {
                return true;
            }
        }
        return false;
    };

    const searchCocktailsByName = (keyword) => {
        let currentResult = [];
        for (let cocktail of allCocktails) {
            if (
                cocktail.strDrink
                    .toLowerCase()
                    .startsWith(keyword.toLowerCase()) &&
                keyword !== ""
            ) {
                currentResult.push(cocktail);
            }
        }
        separateCocktailsByAlcohol(currentResult);
    };

    const searchCocktailsByIngredient = (keyword) => {
        let currentResult = [];
        for (let cocktail of allCocktails) {
            if (hasIngredient(cocktail, keyword) && keyword !== "") {
                currentResult.push(cocktail);
            }
        }
        setResultsByIngredient(currentResult);
    };

    const separateCocktailsByAlcohol = (cocktails) => {
        let alcoholicResults = [];
        let nonAlcoholicResults = [];
        for (let cocktail of cocktails) {
            if (cocktail.strAlcoholic.toLowerCase() === "alcoholic") {
                alcoholicResults.push(cocktail);
            } else if (
                cocktail.strAlcoholic.toLowerCase() === "non alcoholic"
            ) {
                nonAlcoholicResults.push(cocktail);
            }
        }
        setAlcoholicCocktails(alcoholicResults);
        setNonAlcoholicCocktails(nonAlcoholicResults);
    };

    const searchCocktails = (event) => {
        const keyword = event.target.value;
        searchCocktailsByName(keyword);
        searchCocktailsByIngredient(keyword);
    };

    useEffect(() => {
        console.log(alcoholicCocktails);
        console.log(nonAlcoholicCocktails);
    }, [alcoholicCocktails, nonAlcoholicCocktails]);

    return (
        <React.Fragment>
            <h1>Search Cocktails</h1>
            <input type="text" onChange={searchCocktails}></input>
            {alcoholicCocktails.length + nonAlcoholicCocktails.length > 0 ? (
                <ResultContainer
                    alcoholicCocktails={alcoholicCocktails}
                    nonAlcoholicCocktails={nonAlcoholicCocktails}
                />
            ) : (
                ``
            )}
            {resultsByIngredient.length > 0 ? (
                <ResultContainer cocktails={resultsByIngredient} />
            ) : (
                ``
            )}
        </React.Fragment>
    );
};
