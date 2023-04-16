import React, { useState } from 'react';
import axios from 'axios';
import Switch from './switch';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchBy, setSearchBy] = useState('verse');

  const handleSearch = async () => {

    try {
      const response = await axios.get('/api/search', {
        params: {
          search_by: searchBy,
          query: searchTerm,
        },
      });

      // Update the results state with the response data
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching search results');
    }
  };

  const handleToggle = () => {
    setSearchBy(searchBy === 'verse' ? 'chapter' : 'verse');
  };

  return (
    <div className="min-h-screen bg-gray-800 flex">
      <div className="w-1/4 bg-gray-900 p-6">
        <h2 className="text-3xl font-extrabold text-white">Search</h2>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                name="search"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-sage-500 focus:border-sage-500 focus:z-10 sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '1rem' }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>
                <Switch
                  isOn={searchBy === 'chapter'}
                  handleToggle={handleToggle}
                  offLabel="Verse"
                  onLabel="Chapter"
                />
              </div>
              <button
                type="button"
                className={`px-4 py-1 rounded-full text-white ${searchBy === 'verse' ? 'bg-sage-500' : 'bg-sage-300'}`}
                onClick={() => setSearchBy('verse')}
              >
                Verse
              </button>
              <button
                type="button"
                className={`px-4 py-1 rounded-full text-white ${searchBy === 'chapter' ? 'bg-sage-500' : 'bg-sage-300'}`}
                onClick={() => setSearchBy('chapter')}
              >
                Chapter
              </button>
            </div>
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sage-500 hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-400"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-3/4 p-6">
        <ul className="mt-5 space-y-4">
          {results.map((result, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <p className="mb-2" style={{ fontStyle: 'italic' }}>{result.location}</p>
              <p className="mb-2">{result.verse}</p>
              <p><strong>Similarity Score:</strong> {result.similarities.toFixed(4)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;

