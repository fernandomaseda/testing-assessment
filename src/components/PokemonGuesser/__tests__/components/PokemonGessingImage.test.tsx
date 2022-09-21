import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { PokemonGuessingImage } from "../../components/PokemonGuessingImage";
import { ResultState } from "../../types";
import { Pokemon } from "pokenode-ts";

const getRandomState = () => {
  const states = Object.values(ResultState);
  return states[Math.floor(Math.random() * states.length)];
};

describe("Pokemon Image", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render", () => {
    const stateTest = ResultState.GUESSING;
    const pokemonTest: Pick<Pokemon, "id"> = { id: 1 };

    const { getByTestId } = render(
      <PokemonGuessingImage state={stateTest} pokemon={pokemonTest} />
    );

    const image = getByTestId("pokemon-image");

    if (image instanceof HTMLImageElement) {
      expect(image.src).toBe(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonTest.id}.png`
      );
    }

    expect(image).toBeInTheDocument();
    expect(image).toBeVisible();
  });

  it("should have bg color", () => {
    const stateTest = getRandomState();
    const pokemonTest: Pick<Pokemon, "id"> = { id: 5 };

    const { getByTestId } = render(
      <PokemonGuessingImage state={stateTest} pokemon={pokemonTest} />
    );

    const image = getByTestId("pokemon-image");

    if (stateTest === ResultState.GUESSING) {
      expect(image).toHaveStyle("background: black");
    } else {
      expect(image).toHaveStyle("background: white");
    }
  });
});
