import "@testing-library/jest-dom";
import {
  waitFor,
  act,
  screen,
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { createContext, useContext } from "react";
import { mockComponent } from "react-dom/test-utils";
import { PokemonContext } from "../../../context/PokemonContext";
import { PokemonGuesserContainer } from "../PokemonGuesserContainer";

const valueMock: any = () => {
  return {
    dispatch: jest.fn(),
    state: {
      isLoading: false,
      pokemons: [
        {
          name: "bulbasaur",
          id: 1,
        },
      ],
    },
  };
};

jest.mock("../../../constants" as any, () => {
  return {
    MAX_POKEMON_QUANTITY: 1,
  };
});

jest.mock("../../../hooks/useAllPokemons" as any, () => {
  return {
    useAllPokemons: () => jest.fn(),
  };
});

jest.mock("../../PokemonGuesser/hooks/useGetRandomPokemon" as any, () => {
  return {
    useGetRandomPokemon: () => {
      return {
        randomPokemon: {
          name: "bulbasaur",
          id: 1,
        },
        changeRandomPokemon: jest.fn(),
      };
    },
  };
});

//avoid reduce error
// jest.spyOn(React, "useEffect").mockImplementation(() => {});

describe("PokemonGusserContainer Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should be win", async () => {
    const { getByText, queryByPlaceholderText, queryByRole } = render(
      <PokemonContext.Provider value={valueMock()}>
        <PokemonGuesserContainer />
      </PokemonContext.Provider>
    );

    const input = queryByPlaceholderText(
      "Who's that Pokemon?"
    ) as HTMLInputElement;
    const button = queryByRole("button") as HTMLButtonElement;

    expect(input).toBeVisible();
    expect(button).toBeVisible();

    act(() => {
      fireEvent.change(input, { target: { value: "bulbasaur" } });
      userEvent.click(button);
    });

    await waitFor(() => {
      expect(getByText("Excellent!!")).toBeVisible();
    });
  });

  it("should be lost", async () => {
    const { getByText, queryByPlaceholderText, queryByRole } = render(
      <PokemonContext.Provider value={valueMock()}>
        <PokemonGuesserContainer />
      </PokemonContext.Provider>
    );

    const input = queryByPlaceholderText(
      "Who's that Pokemon?"
    ) as HTMLInputElement;
    const button = queryByRole("button") as HTMLButtonElement;

    expect(input).toBeVisible();
    expect(button).toBeVisible();

    act(() => {
      fireEvent.change(input, { target: { value: "charizard" } });
      userEvent.click(button);
    });

    await waitFor(() => {
      expect(getByText(/wrong/i)).toBeVisible();
    });
  });
});
