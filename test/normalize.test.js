"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeEvent } = require("../src/normalize");

test("normalizes alternate field names", () => {
  const result = normalizeEvent({
    type: "cart.updated",
    time: "2026-09-15T10:30:00Z",
    source: "storefront",
    cartId: "cart-42"
  });

  assert.deepEqual(result, {
    eventName: "cart.updated",
    timestamp: "2026-09-15T10:30:00.000Z",
    source: "storefront",
    properties: { cartId: "cart-42" }
  });
});

test("rejects records without an event name", () => {
  assert.throws(
    () => normalizeEvent({ timestamp: "2026-09-15T10:30:00Z" }),
    /event name/
  );
});
