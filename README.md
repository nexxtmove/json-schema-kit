# JSON Schema Kit

Some (very) simple helper functions to write JSON Schema more concisely.

### From

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

### To

```ts
import { object, string, number } from 'json-schema-kit'

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
