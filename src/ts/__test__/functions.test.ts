//import { mockMovieList } from "../services/__mocks__/movieservice";
import { IMovie } from "../models/Movie";
import * as functions from "../functions";
import { movieSort } from "../functions";

describe("Test the function movieSort in two different ways", () => {

    test("Should sort movies in mockMovieList by Title // aka desc = true", () => {

        // Arrange
        const moviesFromMockList: IMovie[] = [
            {
                Title: "Shawshank Redemption",
                imdbID: "123ABC",
                Type: "drama",
                Poster: "...",
                Year: "1994",
            },
            {
                Title: "American Beauty",
                imdbID: "456DEF",
                Type: "drama",
                Poster: "...",
                Year: "1999",
            },
            {
                Title: "The Sixth Sense",
                imdbID: "789GHI",
                Type: "thriller",
                Poster: "...",
                Year: "1999",
            },
        ];

        // Act
        const sortedMovies = movieSort(moviesFromMockList, true);


        // Assert
        expect(sortedMovies).toEqual(moviesFromMockList); // Chansar lite på denna men verkar ju korrekt
        expect(sortedMovies[0].Title).toEqual("American Beauty");
        expect(sortedMovies[1].Title).toEqual("Shawshank Redemption");
        expect(sortedMovies[2].Title).toEqual("The Sixth Sense");
    })

    test("Should sort movies in mockMovieList by Title in descending order // aka desc = false", () => {

        // Arrange
        const moviesFromMockList: IMovie[] = [
            {
                Title: "Shawshank Redemption",
                imdbID: "123ABC",
                Type: "drama",
                Poster: "...",
                Year: "1994",
            },
            {
                Title: "American Beauty",
                imdbID: "456DEF",
                Type: "drama",
                Poster: "...",
                Year: "1999",
            },
            {
                Title: "The Sixth Sense",
                imdbID: "789GHI",
                Type: "thriller",
                Poster: "...",
                Year: "1999",
            },
        ];

        // Act
        const sortedMovies = movieSort(moviesFromMockList, false);

        // Assert
        expect (sortedMovies[0].Title).toBe("The Sixth Sense");
        expect (sortedMovies[1].Title).toBe("Shawshank Redemption");
        expect (sortedMovies[2].Title).toBe("American Beauty");
    })
})


