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

const getQuotes = rest.get("/quotes", (req, res, ctx) => {
  return res(ctx.json(fakeQuotes));
});

const todoErrorResponse = rest.get("/quotes", (req, res, ctx) => {
  return res(ctx.status(500));
});

const handlers = [getQuotes];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Main Page mount", () => {
  it("must display the main page title", () => {
    render(<MainPage />);
    expect(
      screen.getByRole("heading", { name: /simpsons quotes/i })
    ).toBeInTheDocument();
  });

  it("must display 3 quotes", async () => {
    render(<MainPage />);
    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });

  it("must contain quote value", async () => {
    render(<MainPage />);
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
      "listitem"
    );

    const [fakeOne, fakeTwo, fakeThird] = fakeQuotes;
    expect(firstQuote.textContent).toBe(fakeOne.quote);
    expect(secondQuote.textContent).toBe(fakeTwo.quote);
    expect(thirdQuote.textContent).toBe(fakeThird.quote);
  });
});

describe("Main Page API", () => {
  it("must be error API", async () => {
    server.use(todoErrorResponse);

    render(<MainPage />);

    expect(await screen.findByText("Ups, something went wrong!")).toBeVisible();
  });
});
