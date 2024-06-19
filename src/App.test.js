import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  
  // Check if the App component renders without crashing
  const headingElement = screen.getByRole('heading', { name: /MovieLand/i });
  expect(headingElement).toBeInTheDocument();
});

test('searches and displays movies', async () => {
  render(<App />);

  // Simulate typing in the search input and clicking the search button
  const searchInput = screen.getByPlaceholderText(/Search for movies/i);
  fireEvent.change(searchInput, { target: { value: 'Batman' } });
  
  const searchButton = screen.getByAltText(/search/i); // Assuming alt text is 'search'
  fireEvent.click(searchButton);

  // Wait for the movies to load
  await waitFor(() => {
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards.length).toBeGreaterThan(0);
  });
});
