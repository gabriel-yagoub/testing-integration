/**
 * @jest-environment jsdom
 */

import { init, handleSubmit, createHtml, displayNoResult } from "../movieApp";
import * as movieApp from "../movieApp";
import { mockMovieList } from "../services/__mocks__/movieservice";

jest.mock("../services/movieservice.ts");

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('should call function handleSubmit from init() when user clicks submit', () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form> <div id="movie-container"></div>`

    let button: HTMLButtonElement = document.querySelector("#search") as HTMLButtonElement;

    let spy = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(
        new Promise<void>((resolve) => {
            resolve();
        })
    );

    //Act
    init();
    (document.querySelector("#searchForm") as HTMLFormElement)?.submit();

    //Assert   
    expect(spy).toHaveBeenCalled();
}); 

describe("handleSubmit", () => {
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
        await handleSubmit(); 

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
        await handleSubmit();

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


test("Should create p element and display text", () => {
    //Arrange
    document.body.innerHTML = `
        <div id="movie-container"></div>
    `;

    //Act
    const container = (document.getElementById("movie-container") as HTMLInputElement)
    const newPElement = `<p>Inga sökresultat att visa</p>`
    
    movieApp.displayNoResult(container)

    let htmlResult = document.querySelector("#movie-container")?.innerHTML;

    //Assert
    expect(htmlResult).toEqual(newPElement);
})