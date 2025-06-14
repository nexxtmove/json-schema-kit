# JSON Schema Kit

Some [very simple](index.ts) helper functions to write JSON Schema more concisely.

<a href="https://www.npmjs.com/package/json-schema-kit" target="_blank"><img src="https://img.shields.io/npm/v/json-schema-kit?style=flat-square&color=green" alt="Version"></a>
<a href="https://www.npmjs.com/package/json-schema-kit" target="_blank"><img src="https://img.shields.io/npm/l/json-schema-kit?style=flat-square&color=green" alt="License"></a>

```ts
import { object, string, number, array } from 'json-schema-kit'

object({
  name: string(),
  price: number({ description: 'Price in dollars' }),
  tags: array(string()),
})
```

## Install

```bash
npm install json-schema-kit
```

## Comparison

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

🤔 Powerful but verbose

### Using JSON Schema Kit

```ts
object({
  name: string(),
  price: number({ description: 'Price in dollars' }),
  tags: array(string()),
  dimensions: object({
    length: number(),
    width: number(),
    height: number(),
  }),
})
```

✅ Clean and readable

## Why not Zod?

Zod is a versatile and comprehensive library, spanning thousands of lines of code. However, it's not specifically built for generating JSON Schemas, which can lead to unexpected results during conversion. In contrast, JSON Schema Kit provides full control — all in under 100 lines of code.
