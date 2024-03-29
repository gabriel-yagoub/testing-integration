/**
 * @jest-environment jsdom
 */

import * as movieApp from "../movieApp";
import { mockMovieList } from "../services/__mocks__/movieservice";

jest.mock("../services/movieservice.ts");

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("Should call function handleSubmit when init() runs", () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form> <div id="movie-container"></div>`

    let spyOnHandleSubmit = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(
        new Promise<void>((resolve) => {
            resolve();
        })
    );

    //Act
    movieApp.init();
    (document.querySelector("#searchForm") as HTMLFormElement)?.submit();

    //Assert   
    expect(spyOnHandleSubmit).toHaveBeenCalled(); // Kommer inte på varför den här jäkeln inte funkar
}); 

describe("Testing function handleSubmit", () => {
    test("Should show movies", async () => {
        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
          <input type="text" id="searchText" placeholder="Skriv titel här" />
          <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>`;
    
        //Act
        let searchText = (document.getElementById("searchText") as HTMLInputElement)
        let spyOnCreateHtml = jest.spyOn(movieApp, "createHtml").mockReturnValue()
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;
          container.innerHTML = "";
    
        searchText.value = "American Beauty";
        await movieApp.handleSubmit(); 

        //Assert
        expect(spyOnCreateHtml).toBeCalled();
        expect(spyOnCreateHtml).toBeCalledWith(mockMovieList, container);
        spyOnCreateHtml.mockRestore();
    })

    test("Should call function displayNoResult", async () => {
        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
          <input type="text" id="searchText" placeholder="Skriv titel här" />
          <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>`;

        let spyOnNoResult = jest.spyOn(movieApp, "displayNoResult").mockReturnValue()
    
        //Act
        await movieApp.handleSubmit();

        //Assert
        expect(spyOnNoResult).toBeCalled();
        spyOnNoResult.mockRestore();
    })

})

test("Should create HTML", () => {
    //Arrange
    document.body.innerHTML = `
        <div id="movie-container"></div>
    `;
    
    const container = (document.getElementById("movie-container") as HTMLInputElement)

    //Act
    movieApp.createHtml(mockMovieList, container);

    //Assert
    expect(mockMovieList[0].Title).toEqual("Shawshank Redemption");
    expect(mockMovieList[0].imdbID).toEqual("123ABC");
})


test("Should create element and display text", () => {
    //Arrange
    document.body.innerHTML = `
        <div id="movie-container"></div>
    `;

    //Act
    let container = (document.getElementById("movie-container") as HTMLInputElement)
    movieApp.displayNoResult(container)
    let movieContainerHTML = document.getElementById("movie-container")?.innerHTML;

    //Assert
    expect(movieContainerHTML).toContain("Inga sökresultat att visa");
    expect(movieContainerHTML).toContain("p");
})