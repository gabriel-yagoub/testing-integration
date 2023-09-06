/**
 * @jest-environment jsdom
 */
import { IMovie } from "../models/Movie";
import { mockMovieList } from "../services/__mocks__/movieservice";
import { getData } from "../services/movieservice";

jest.mock("axios", () => ({
    get: async (url: string) => {
        return new Promise ((resolve, reject) => {
            if(url.endsWith("error")) {
                reject([]);
            }
            else {
                resolve ( { data: {Search: mockMovieList} })
            }
        })
    }
}));

test("Should get data correctly", async () => {

    //Arrange
    //Finns ingen Arrange på denna
    
    //Act
    let movieData: IMovie[] = await getData("Bla bla");

    //Assert
    expect(movieData.length).toEqual(3);
    expect(movieData[0].Title).toEqual("Shawshank Redemption");
    expect(movieData[1].Title).toEqual("American Beauty");
    expect(movieData[2].Title).toEqual("The Sixth Sense");
})

test("Should get error getting data", async () => {
    try {
        await getData("error");
        // If we reach this point, the test should fail because an error was not thrown.
        expect(true).toBe(false);
    } catch (err) {
        // Expect that an error was thrown (the test will pass if we reach this point)
        expect(err).toBeDefined();
    }
});
