import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom";
const axios = require("axios");
import React, { useState } from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Dictionary from "../src/container/Dictionary";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { fetchData } from './util.js';

jest.mock("axios");

Enzyme.configure({ adapter: new Adapter() });

test("renders Dictionary", () => {
  render(<App />);
  const linkElement = screen.getByText(/Dictionary/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Search Dictionary", () => {
  test("Search Field Elements should be present", () => {
    render(<App />);
    const submitButton = screen.getByText(/Submit/i);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});

describe("Search Dictionary Success", () => {
  test("User can search ", async () => {
    render(<App />);
    const mockedResponse = {
              definitions: {
                definition:
                  "A mammal, Canis familiaris or Canis lupus familiaris, that has been domesticated for thousands of years, of highly variable appearance due to human breeding.",
                example: "The dog barked all night long.",
              }
    };

    axios.get.mockResolvedValue(mockedResponse);
    axios.get = jest.fn(() => mockedResponse);
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/dog');
    expect(axios.get).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/dog'); 
    expect(axios.get).toHaveReturnedWith(mockedResponse);
    await expect(fetchData('dog')).resolves.toEqual(mockedResponse);
  });
});

describe("Search Dictionary Error", () => {
  test("User can search ", async () => {
    render(<App />);
    const mockedResponse = {
      message: "Sorry pal, we couldn't find definitions for the word you were looking for. You can try another word."
    };

    axios.get.mockResolvedValue(mockedResponse);
    axios.get = jest.fn(() => mockedResponse);
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/agf');
    expect(axios.get).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/agf'); 
    expect(axios.get).toHaveReturnedWith(mockedResponse);
    await expect(fetchData('agf')).resolves.toEqual(mockedResponse);
  });
});

// describe("Search Dictionary Error", () => {
//   test("User can search ", async () => {
//     render(<App />);
//     const searchInput = screen.getByLabelText(/Search/i);
//     const submitButton = screen.getByText(/Submit/i);
//     expect(searchInput).toHaveValue("");
//     userEvent.type(searchInput, "agf");
//     expect(searchInput).toHaveValue("agf");
//     userEvent.click(submitButton);

//     await waitFor(() => screen.getByText(/Sorry pal/i));
//   });
// });

// test('setOpenIndex sets the open index state properly', () => {
//   const wrapper = mount(<Dictionary />)
//   expect(wrapper.state('word')).toBe("")
//   wrapper.instance().setWord("dog")
//   expect(wrapper.state('word')).toBe("dog")

// const query = "nirvana";
// const mockChange = jest.fn();
// searchInput.onChange = mockChange;
// fireEvent.change(searchInput, { target: { value: query } });
// })

// describe("mock api calls", () => {
  // const mockedResponse = {
    //   data: [
    //     {
    //       meanings: [
    //         {
    //           definitions: {
    //             definition:
    //               "A mammal, Canis familiaris or Canis lupus familiaris, that has been domesticated for thousands of years, of highly variable appearance due to human breeding.",
    //             example: "The dog barked all night long.",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   status: 200,
    // };

//    test("mocking external endpoint in axios", () => {

//        // arrange
//        const mockedResponse = {data: "dog"}
//        axios.get.mockResolvedValue(mockedResponse)
//        //const app = require('../app.js')

//        // act
//       // app.getUserData()

//        // asserts
//        expect(axios.get).toHaveBeenCalled()
//        expect(axios.get).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/dog')

//await waitFor(() => screen.getByText(/Definitions/i))
//    })
// })
