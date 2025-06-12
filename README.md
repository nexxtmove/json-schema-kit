# JSON Schema Kit

Some (very) simple helper functions to write JSON Schema more concisely.

### From
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Name of the product" },
    "price": { "type": "number", "description": "The price of the product" },
    "tags": {
      "type": "array",
      "description": "Tags for the product",
      "items": { "type": "string" }
    },
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
  name: string({ description: 'Name of the product' }),
  price: number({ description: 'The price of the product' }),
  tags: array(string(), { description: 'Tags for the product' }),
  dimensions: object({
    length: number(),
    width: number(),
    height: number()
  })
})
```
