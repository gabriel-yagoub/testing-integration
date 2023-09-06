import { IMovie } from "../../models/Movie";

export let mockMovieList : IMovie[] = [
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

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if (searchText !== 'error' && searchText !== ''){
            resolve(mockMovieList)
        }else {
            reject ([])
        }
    });
}

/*

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if (searchText !== 'error' && searchText !== ''){
            resolve(mockMovieList.filter((testData) => testData.Title.includes(searchText)))
        }else {
            reject ([])
        }
    });
}

*/