import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { MainPage } from "../components/main-page";

const fakeQuotes = [
  { quote: "Gah, stupid sexy Flanders!" },
  { quote: "Eat my shorts" },
  { quote: "Shut up, brain. I got friends now. I don't need you anymore" },
];

const server = setupServer(
  rest.get("/quotes", (req, res, ctx) => {
    return res(ctx.json(fakeQuotes));
  })
);

beforeEach(() => render(<MainPage />));

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Main Page mount", () => {
  it("must display the main page title", () => {
    expect(
      screen.getByRole("heading", { name: /simpsons quotes/i })
    ).toBeInTheDocument();
  });
});

describe("Quotes List", () => {
  it("must display 3 quotes", async () => {
    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });

  it("must contain quote value", async () => {
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
      "listitem"
    );

    const [fakeOne, fakeTwo, fakeThird] = fakeQuotes;
    expect(firstQuote.textContent).toBe(fakeOne.quote);
    expect(secondQuote.textContent).toBe(fakeTwo.quote);
    expect(thirdQuote.textContent).toBe(fakeThird.quote);
  });
});
