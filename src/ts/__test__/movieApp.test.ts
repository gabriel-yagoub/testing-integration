/**
* @jest-environment jsdom 
*/

import * as movieApp from '../movieApp';
import * as movieService from '../services/movieservice';
import { IMovie } from '../models/Movie';
import { mockMovieList } from '../services/__mocks__/movieservice';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('../services/movieservice');

describe("Test the function init", () => {

    test("Should call handleSubmit when form is submitted", () => {

        // Arrange
        document.body.innerHTML = 
        `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        `;

        let spyOnHandleSubmit = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));


        let form = document.getElementById("searchForm") as HTMLFormElement;
        
        // Act
        movieApp.init();
        form.submit();

        // Assert
        expect(spyOnHandleSubmit).toHaveBeenCalled();
    })
})

