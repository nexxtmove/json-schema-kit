# JSON Schema Kit

Some (very) simple helper functions to write JSON Schema more concisely.

### Traditional JSON Schema

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number", "description": "Price in dollars" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" }
      },
      "required": ["length", "width", "height"]
    }
  },
  "required": ["name", "price", "tags", "dimensions"]
}
```

Powerful but verbose

### With JSON Schema Kit

```ts
object({
  name: string(),
  price: number({ description: 'Price in dollars' }),
  tags: array(string()),
  dimensions: object({
    length: number(),
    width: number(),
    height: number()
  })
})
```

Clean and readable
