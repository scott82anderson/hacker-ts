import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

const testPost = {
  id: 1,
  by: "author",
  time: 946720800,
  text: "The post body",
  title: "Post title",
  url: "https://www.google.com",
  descendants: 10,
  kids: [],
  type: "post"
}

test('render a Post', () => {
  render(<Router><Post {...testPost} /></Router>);
  const titleElement = screen.getByText(/Post title/i);
  expect(titleElement).toBeInTheDocument();
});


test('Post snapshot', () => {
  const tree = renderer
    .create(<Router><Post {...testPost} /></Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
