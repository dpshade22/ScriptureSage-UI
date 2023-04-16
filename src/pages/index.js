import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const sampleData = [
    {
      title: 'Example 1',
      description: 'This is an example description for Example 1.',
      url: 'https://www.example1.com',
    },
    {
      title: 'Example 2',
      description: 'This is an example description for Example 2.',
      url: 'https://www.example2.com',
    },
    // Add more sample data...
  ];


  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search', {
        params: {
          search_by: 'chapter', // or 'verse' depending on your use case
          query: searchTerm,
          // query_2: searchTerm2, // Uncomment and set a value if you want to search with 2 terms
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching search results');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Search
          </h2>
        </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
        <ul className="mt-5 space-y-4">
          {results.map((result, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold">{result.title}</h3>
              <p>{result.description}</p>
              <a
                href={result.url}
                className="text-indigo-600 hover:text-indigo-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
