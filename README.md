# Event Stream Normalizer

Small Node.js service for converting newline-delimited event feeds into a
stable analytics envelope. It accepts JSONL input, applies the bundled event
schema, and writes normalized records to standard output.

## Usage

```powershell
npm install
npm start -- examples\events.jsonl
```

Input records may use `event`, `eventName`, or `type` for the event name and
`timestamp`, `time`, or `createdAt` for the timestamp. Unknown fields are kept
under `properties`.

```json
{
  "eventName": "checkout.completed",
  "timestamp": "2026-09-15T18:42:00Z",
  "source": "storefront",
  "properties": {
    "orderId": "A-1048",
    "total": 42.5
  }
}
```

## Development

```powershell
npm test
```

The schema adapter lives in `packages/event-schema` so it can be versioned
independently from the ingestion process.
