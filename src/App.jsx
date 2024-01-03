import { useState, useEffect } from 'react'
import './App.css'
import Loader from './Loader';

function App() {

  const url = "http://hn.algolia.com/api/v1/search?query="
  const [stories, setStories] = useState([]); // state for stories
  const [query, setQuery] = useState(''); // state for query
  const [loading, setLoading] = useState(true); // state for loading

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    getStories();
    e.preventDefault();

  }


  const getStories = () => {
    setLoading(true);
    fetch(url + query)
      .then(response => response.json())
      .then(data => setStories(data.hits))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }

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
        <hr />
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
        </ul>
      </header>

    </div>
  )


}

export default App
