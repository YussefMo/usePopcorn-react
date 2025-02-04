import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Loader from '../UI/Loader';
import RatingWindow from '../rating-window/RatingWindow';

const KEY = '9663d7c7'
function SelectedMovie({ selectId, onClose, onAddMovie, watched }) {
    const [isLoading, setIsLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const [userRating, setUserRating] = useState(null)

    const
        { Title: title,
            Year: year,
            Poster: poster,
            Runtime: runtime,
            imdbRating,
            Plot: plot,
            Released: released,
            Actors: actors,
            Director: director,
            Genre: genre,
        } = movie;

    const isWatched = watched.map((w) => w.imdbID).includes(selectId)
    const watchedUserRating = watched.find((w) =>w.imdbID === selectId)?.userRating

    useEffect(function () {
        async function getMovieDetails() {
            setMovie({})
            setIsLoading(true)

            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectId}`)
            const data = await res.json();
            setMovie(data)
            setIsLoading(false)
        }
        getMovieDetails()
    }
        , [selectId])

        useEffect(function () {
            function callBack (e) {
                if (e.key === 'Escape') {
                    onClose()
                }
            }

            document.addEventListener('keydown' , callBack)

            return function () {
                document.removeEventListener('keydown' , callBack)
            }
        },[onClose])

    function handelAdd() {
        const movieData = {
            imdbID: selectId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ')[0]),
            userRating,
        }
        onAddMovie(movieData)
        onClose()
    }

    useEffect(function () {
        if (!title) return
        document.title = `Movie | ${title}`

        return function () {
            document.title = 'usePopcorn'
        }
    } ,[title])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="details">
                    <header>
                        <button
                            className="btn-back"
                            onClick={() => onClose()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <img src={poster} alt={`Poster Of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDB Rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ?
                                (<>
                                    <RatingWindow
                                        maxRating={10}
                                        onSetRating={setUserRating} />
                                    {userRating &&
                                        <button
                                            className="btn-add"
                                            onClick={handelAdd}
                                        >+ Add To List</button>}
                                </>) : (
                                    <p>you have rated this movie before and gave it {watchedUserRating} ⭐</p>
                                )}
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </div>
            )}
        </>
    )
}

export default SelectedMovie;