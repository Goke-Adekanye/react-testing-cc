import React from "react";
import Counter from "../Counter";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;
beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

test("header renders correct text", () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});

test("counter text initialized at 0", () => {
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
});

test("input initialized at 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");
  expect(subtractBtn.textContent).toBe("-");
});

test("change value works perfectly", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  expect(inputEl.value).toBe("5");
});

test("click on add btn increment counter", () => {
  const addBtn = getByTestId("add-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(addBtn);

  expect(counterEl.textContent).toBe("1");
});

test("click on subtract btn decrement counter", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(subtractBtn);

  expect(counterEl.textContent).toBe("-1");
});

test("multiple add and sutract clicks set correct counter value", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });

  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.textContent).toBe("15");
});

test("change counter className", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("");

  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("green");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.className).toBe("");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("red");
});
