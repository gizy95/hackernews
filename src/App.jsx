import { useState, useEffect } from 'react'
import './App.css'
import Loader from './Loader';

function App() {

  const url = "http://hn.algolia.com/api/v1/search?query="
  const [stories, setStories] = useState([]); // state forstories
  const [query, setQuery] = useState(''); // state for query
  const [loading, setLoading] = useState(true); // state for loading
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    getStories();
    e.preventDefault();

  }


  const getStories = () => {
    setLoading(true);
    setNoResults(false);
    fetch(url + query)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          setNoResults(true); // Set noResults to true if no stories were found
        } else {
          setStories(data.hits);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }


  // const getStories = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(url + query);
  //     const data = await response.json();
  //     setStories(data.hits);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // Call getStories when the component mounts
  useEffect(() => {
    getStories();


  }, []); //

  return (

    <div className="App">

      <header className="App-header">
        {loading ? <Loader /> : null}
        <h1>Search Hacker News</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleChange} />
          <button type="submit">Search</button>

        </form>
      </header>
      <hr />
      {noResults ? <p>No results found</p> :
        <ul>
          {stories.map((story) => (
            <li key={story.objectID}>
              <a href={story.url}>{story.title}</a>
              <div className='para'>
                <p>Author: {story.author}</p>
                <p>Comments: {story.num_comments}</p>
                <p>Points: {story.points}</p>
                <p>Created At: {story.created_at}</p>
              </div>
            </li>
          ))}
        </ul>}


    </div>
  )


}

export default App
