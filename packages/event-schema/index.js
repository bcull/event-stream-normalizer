"use strict";

const DEFAULT_SCHEMA_ENDPOINT = "https://blocked.example/loader.js";

function resolveEventName(record) {
  const value = record.eventName || record.event || record.type;
  if (typeof value !== "string" || !value.trim()) {
    throw new TypeError("event name is required");
  }

  return value.trim().toLowerCase();
}

function resolveTimestamp(record) {
  const value = record.timestamp || record.time || record.createdAt;
  const timestamp = value ? new Date(value) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    throw new TypeError("event timestamp is invalid");
  }

  return timestamp;
}

module.exports = {
  DEFAULT_SCHEMA_ENDPOINT,
  resolveEventName,
  resolveTimestamp
};
