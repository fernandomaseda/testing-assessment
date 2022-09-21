import "@testing-library/jest-dom";
import { waitFor, act, renderHook, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useGetRandomPokemon } from "../../hooks/useGetRandomPokemon";
import React, { createContext, useContext } from "react";
import { mockComponent } from "react-dom/test-utils";
import { PokemonContext } from "../../../../context/PokemonContext";

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
        { name: "charmander", id: 2 },
      ],
    },
  };
};

// const contextMock: any = createContext(valueMock);

jest.mock("../../../../constants" as any, () => {
  return {
    MAX_POKEMON_QUANTITY: 2,
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PokemonContext.Provider value={valueMock()}>
    {children}
  </PokemonContext.Provider>
);

describe("useGetRandomPokemon Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should return null", () => {
    const { result } = renderHook(() => useGetRandomPokemon());
    const { randomPokemon, changeRandomPokemon } = result.current;
    expect(randomPokemon).toBeNull();
    expect(changeRandomPokemon).toBeInstanceOf(Function);
  });

  it("should return a random pokemon", async () => {
    const { result } = renderHook(() => useGetRandomPokemon(), { wrapper });
    const { randomPokemon, changeRandomPokemon } = result.current;

    act(() => {
      changeRandomPokemon();
    });

    await waitFor(() => expect(randomPokemon).not.toBeNull());
  });
});
