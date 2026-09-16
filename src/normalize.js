"use strict";

const { resolveEventName, resolveTimestamp } = require("@northstar/event-schema");

const RESERVED_FIELDS = new Set([
  "event",
  "eventName",
  "type",
  "timestamp",
  "time",
  "createdAt",
  "source"
]);

function normalizeEvent(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new TypeError("event record must be an object");
  }

  const properties = Object.fromEntries(
    Object.entries(record).filter(([key]) => !RESERVED_FIELDS.has(key))
  );

  return {
    eventName: resolveEventName(record),
    timestamp: resolveTimestamp(record).toISOString(),
    source: String(record.source || "unknown"),
    properties
  };
}

module.exports = { normalizeEvent };
