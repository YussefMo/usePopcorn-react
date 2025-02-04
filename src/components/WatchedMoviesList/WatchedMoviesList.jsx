import WatchedMoviesListItem from "./WatchedMoviesListItem";



function WatchedMoviesList({ watched , onDelete }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMoviesListItem movie={movie} key={movie.imdbID} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default WatchedMoviesList;