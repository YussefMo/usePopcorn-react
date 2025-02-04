/* eslint-disable react/prop-types */
import MoviesListItem from './MoviesListItem';

function MoviesList({ movies , handler }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MoviesListItem movie={movie} key={movie.imdbID} onClick={handler} />
            ))}
        </ul>
    )
}

export default MoviesList;