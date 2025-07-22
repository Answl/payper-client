import { expect, it } from "vitest";

it("1 + 1 should be 2", () => {
  expect(1 + 1).toBe(2);
});

it("responds with the user", async () => {
  const response = await fetch("https://api.example.com/user");

  await expect(response.json()).resolves.toEqual({
    id: "abc-123",
    firstName: "John",
    lastName: "Maverick",
  });
});
