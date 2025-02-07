import { useEffect, useState } from "react"
import { useMovie } from "./useMovie";
import NavBar from "./NavBar/NavBar"
import Logo from "./NavBar/nav-comp/Logo";
import Search from "./NavBar/nav-comp/Search";
import SearchRes from "./NavBar/nav-comp/SearchRes";
import Main from "./UI/Main";
import Box from "./UI/Box";
import MoviesList from "./MoviesList/MoviesList";
import WatchedMoviesList from "./WatchedMoviesList/WatchedMoviesList";
import WatchedMoviesListCalc from "./WatchedMoviesList/WatchedMoviesListCalc";
import Loader from "./UI/Loader";
import ErrorMessage from "./UI/ErrorMessage";
import SelectedMovie from "./SelectedMovie/SelectedMovie";



function Container() {
    const [query, setQuery] = useState("");
    const [selectId, setSelectId] = useState(null)
    const { movies, isLoading, getError } = useMovie(query , handelCloseSelectedMovie)
    const [watched, setWatched] = useState(function(){
        const stored = localStorage.getItem("watched")
        if (stored){
            return JSON.parse(stored)
        }else{
            return []
        }
    });


    function handelSelectedId(id) {
        setSelectId((selectedId) => selectedId === id ? null : id)
    }

    function handelCloseSelectedMovie () {
        setSelectId(null)
    }

    function handelAddWatched(movie) {
        setWatched((prev) => [...prev, movie])
    }

    useEffect(function () {
        localStorage.setItem("watched", JSON.stringify(watched))
    } , [watched])

    function handelDeleteWatched(movie) {
        setWatched((prev) => prev.filter((m) => m.imdbID!== movie.imdbID))
    }

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <SearchRes movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !getError && <MoviesList handler={handelSelectedId} movies={movies} />}
                    {getError && <ErrorMessage message={getError} />}
                </Box>
                <Box>
                    {selectId ? (
                        <SelectedMovie 
                        selectId={selectId} 
                        onClose={handelCloseSelectedMovie}
                        onAddMovie={handelAddWatched}
                        watched={watched} />
                    ) : (
                        <>
                            <WatchedMoviesListCalc watched={watched} />
                            <WatchedMoviesList watched={watched} onDelete={handelDeleteWatched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}

export default Container