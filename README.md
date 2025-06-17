# 🧰 JSON Schema Kit

Some [very simple](https://github.com/nexxtmove/json-schema-kit/blob/main/index.ts) helper functions to write JSON Schema more concisely.  
Especially useful when working with [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

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
        "width": { "type": "number" },
        "height": { "type": "number" }
      },
      "required": ["width", "height"],
      "additionalProperties": false
    }
  },
  "required": ["name", "price", "tags", "dimensions"],
  "additionalProperties": false
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
    width: number(),
    height: number(),
  }),
})
```

✅ Clean and readable

## Why not Zod?

Zod is a versatile and comprehensive library, spanning thousands of lines of code. However, it's not specifically built for generating JSON Schemas, which can lead to unexpected results during conversion. In contrast, JSON Schema Kit provides full control — all in under 100 lines of code.
