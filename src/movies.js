// import { movies } from "./data";

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const dirArray = moviesArray.map(function (movie) {
        return movie.director;
    });
    return dirArray;
}

// or with arrow function 
function getAllDirectors(moviesArray) {
    const dirArray = moviesArray.map((array) => array.director);
    return dirArray;
}


// BONUS REMOVING DUPLICATES 
function getAllDirectoresClean(moviesArray) {
    const dirArray = moviesArray.map((array) => array.director);
    const cleanDirArray = dirArray.filter(function (director, index) {
        return dirArray.indexOf(director) === index;
    });
    return cleanDirArray;
}


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(moviesArray) {
    const spielbergMovies = moviesArray.filter((movies) => {
        return (movies.director === "Steven Spielberg") && (movies.genre.includes("Drama"))
    });
    return spielbergMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    const numberMovies = moviesArray.length;

    if (numberMovies < 1) {
        return 0;
    }
    const initialValue = 0;
    const totalScore = moviesArray.reduce(function (total, currentValue) {
        if (typeof currentValue.score === "number") {
            return total + currentValue.score;
        } else {
            return 0 + total;
        }
    }, initialValue);

    const average = totalScore / numberMovies;
    return Math.round(average * 100) / 100;
}

// NOTE: when using function over arrow function we can incorporate conditions 

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter((myArray) => myArray.genre.includes("Drama"));
    const numberDramaMovies = dramaMovies.length;

    if (numberDramaMovies < 1) {
        return 0;

    } else {
        const initialValue = 0;
        const totalDrama = dramaMovies.reduce((total, currentValue) => {
            return total + currentValue.score
        }, initialValue);
        const result = totalDrama / numberDramaMovies;
        return Math.round(result * 100) / 100;
    }

}
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    /* there is three ways to copy an object. 
    1) We can just assign the same object to another variable 
    but this will make the two variables referenciate the same object in memory. So if I change the copy
    the original will also change
    2) We can do a shallow copy that copies usign Object.assign(<target>, <sourced>)
    This shallow copy will create two variables that reference two different objects but if we have inside 
    of this objects other objects referecend by a value (propiety) both the original and the copy will 
    reference the same inisde object
    3) Deep copy --> using JSON.parse(JSON(strongify(<source to be copied>)))
    */
    const copyArray = JSON.parse(JSON.stringify(moviesArray));

    // USING ES5
    copyArray.sort(function (a, b) {
        // if the years are different
        if (a.year !== b.year) {
            return a.year - b.year;

        } else {
            // if the years are the same 
            //order the strings alphabeticly
            let lowerCasedTitleA = a.title.toLowerCase();
            let lowerCasedTitleB = b.title.toLowerCase();
            return lowerCasedTitleA.localeCompare(lowerCasedTitleB); // (-1 or 0 or 1) returns a number indifcating wheter a reference string comes before or after another

            // console.log(lowerCasedTitleA < lowerCasedTitleB); // true or false
            // the normal comparision dont work because it returns a true or false boolean. We need to return a -1, 1 or 0

            // longer way to do

            // OR //
            //     if (lowerCasedTitleA < lowerCasedTitleB) {
            //         return -1
            //     } else if (lowerCasedTitleA > lowerCasedTitleB) {
            //         return 1
            //     } else {
            //         return 0
            //     }
        }
    });
    return copyArray
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const onlyTitlesObject = moviesArray.map((movie) => movie.title); // get into a new array all the proprieties title
    onlyTitlesObject.sort((a, b) => {
        let lowerCasedTitleA = a.toLowerCase()
        let lowerCasedTitleB = b.toLowerCase();

        return lowerCasedTitleA.localeCompare(lowerCasedTitleB);
    })

    return onlyTitlesObject.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

// helper function
function converToMin(myString) {
    const pattern = new RegExp("\\D+", "g"); // patter to gett all none digit numbers
    const newString = myString.replace(pattern, " ").trim();
    const arrayHourMin = newString.split(" ");
    const hours = parseInt(arrayHourMin[0])
    const min = parseInt(arrayHourMin[1])
    if (min) {
        let totalMin = hours * 60 + min;
        return totalMin
    } else {
        let totalMin = hours * 60;
        return totalMin
    }
}

function turnHoursToMinutes(moviesArray) {
    const durationInMin = moviesArray.map(({ title, year, director, duration, genre, score }) => {
        let newDuration = converToMin(duration);
        console.log(typeof newDuration)
        return { title: title, year: year, director: director, duration: newDuration, genre: genre, score: score };
    });
    return durationInMin;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (moviesArray.length < 1) {
        return null
    } else {


        // create an array with all the years
        const yearArray = moviesArray.map(({ year }) => year);
        // filter the array on unique years
        const uniqueYears = yearArray.filter((year, index) => yearArray.indexOf(year) === index)


        // loop each unique year and from each year create an array "sameYearMovies with all the movies of that year"
        const moviesAverageYearArray = []
        uniqueYears.forEach((year) => {
            const sameYearMovies = moviesArray.filter((movie) => {
                return movie.year === year;
            });

            const numberOfMoviesYear = sameYearMovies.length;

            // reduce to comput the average for the array in the current iteration
            const initialValue = 0;
            const sumValues = sameYearMovies.reduce((total, nextValue) => {
                return total + nextValue.score
            }, initialValue);
            const average = sumValues / numberOfMoviesYear;

            moviesAverageYearArray.push({ year: year, average: average });

        });

        moviesAverageYearArray.sort((a, b) => {
            if (a.average != b.average) {
                return b.average - a.average
            } else {
                return a.year - b.year
            }
        })

        const yearWin = moviesAverageYearArray[0].year;
        const averageWin = moviesAverageYearArray[0].average;

        return `The best year was ${yearWin} with an average score of ${averageWin}`;
    }

}
