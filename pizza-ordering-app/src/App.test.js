import { ApolloClient, createHttpLink } from '@apollo/client';
import { CHECK_USER_QUERY } from './App';
import { checkUser } from './App';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';
import client from './components/Client';

jest.mock('@apollo/client', () => {
  return {
    ApolloClient: jest.fn(),
    InMemoryCache: jest.fn(),
    createHttpLink: jest.fn().mockReturnValue({
      concat: jest.fn(),
    }),
    gql: jest.fn(),
  };
});

jest.mock('./components/Client', () => {
  return {
    __esModule: true, // this property makes it work
    default: {
      query: jest.fn(),
    },
  };
});

jest.mock('@apollo/client/link/context', () => {
  return {
    setContext: jest.fn().mockReturnValue({
      concat: jest.fn(),
    }),
  };
});



let mockQuery;

beforeEach(() => {
  mockQuery = jest.fn();

  createHttpLink.mockReturnValue({});
  setContext.mockReturnValue({
    concat: jest.fn().mockReturnValue({ query: mockQuery }),
  });

  ApolloClient.mockImplementation(() => ({ query: mockQuery }));
});

test('returns true when the user exists', async () => {
  const username = 'mitky';
  const password = 'mitky';

  // Set up client.query to return the data that checkUser expects
  client.query.mockResolvedValue({
    data: {
      appointment_project: [{
        username: 'mitky',
        password: 'mitky'
      }], 
    },
  });

  // Call checkUser and await the result
  const result = await checkUser(username, password);

  // Expect the result to be true
  expect(result).toBe(true);
});

test('returns false when the user does not exist', async () => {
  const username = 'nonexistent';
  const password = 'nonexistent';

  // Set up client.query to return data that indicates the user does not exist
  client.query.mockResolvedValue({
    data: {
      appointment_project: [], // Empty array indicates no user found
    },
  });

  // Call checkUser and await the result
  const result = await checkUser(username, password);

  // Expect the result to be false
  expect(result).toBe(false);
});