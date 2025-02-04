import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
    const inputEl = useRef(null)

    useEffect(() => {
        function callBack (e) {
            if (document.activeElement === inputEl.current) return;
            if (e.key === 'Enter') {
                inputEl.current.focus()
                setQuery('')
            }
        }
        document.addEventListener('keydown', callBack)
        return () => document.removeEventListener('keydown', callBack)
    }, [setQuery])

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search;