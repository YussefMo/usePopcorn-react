import { useState, useEffect } from "react";

const KEY = '9663d7c7'

export function useMovie(query , callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [getError, setGetError] = useState("");
    useEffect(function () {
        const controller = new AbortController()
        async function fetchMove() {
            try {
                setIsLoading(true)
                setGetError("")

                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal })
                if (!res.ok) {
                    throw new Error("Something went wrong with fetching movies")
                }

                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error("Movie not found Pleas Cheek your Input");
                }

                setMovies(data.Search)
                setGetError("")
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err.message)
                    setGetError(err.message);
                }
            } finally {
                setIsLoading(false)
            }
        }
        if (query?.length < 3) {
            setMovies([])
            setGetError("")
            callback()
            return
        } else if (query?.trim() === "") {
            setMovies([])
            setGetError("")
            callback()
            return
        }
        callback()
        fetchMove()

        return function () {
            controller.abort()
        }

    }, [query])
    return { movies, isLoading, getError }

}

