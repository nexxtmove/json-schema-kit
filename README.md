# 🧰 JSON Schema Kit

Some [very simple](https://github.com/nexxtmove/json-schema-kit/blob/main/src/index.ts) helper functions for writing concise JSON Schema — perfect for [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

<a href="https://www.npmjs.com/package/json-schema-kit" target="_blank"><img src="https://img.shields.io/npm/v/json-schema-kit?style=flat-square&color=%234c1" alt="Version"></a>
<a href="https://www.npmjs.com/package/json-schema-kit" target="_blank"><img src="https://img.shields.io/npm/l/json-schema-kit?style=flat-square&color=%234c1" alt="License"></a>
<a href="https://github.com/nexxtmove/json-schema-kit/actions" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/nexxtmove/json-schema-kit/tests.yml?label=tests&style=flat-square&color=%234c1" alt="Tests"></a>

## ✨ Quick Taste

```ts
import { object, string, number, array, nullable } from 'json-schema-kit'

object({
  name: string(),
  price: number({ minimum: 0 }),
  description: nullable(string()),
  categories: array(string()),
})
```

> All functions just return plain JavaScript objects. Freely modify or extend them to fit your needs.

## 🚀 Installation

```bash
npm install json-schema-kit
```

## 🆚 Comparison

<details>

<summary>Traditional JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number", "description": "Price in dollars" },
    "discount": { "anyOf": [{ "type": "number" }, { "type": "null" }] },
    "categories": { "type": "array", "items": { "type": "string", "enum": ["electronics", "clothing", "books"] } },
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
  "required": ["name", "price", "discount", "categories", "dimensions"],
  "additionalProperties": false
}
```

</details>

<details>

<summary>Using JSON Schema Kit</summary>

```ts
object({
  name: string(),
  price: number({ description: 'Price in dollars' }),
  discount: nullable(number()),
  categories: array(string({ enum: ['electronics', 'clothing', 'books'] })),
  dimensions: object({
    width: number(),
    height: number(),
  }),
})
```

</details>

## 🤖 OpenAI Structured Outputs

JSON Schema Kit is perfectly suited for OpenAI's Structured Outputs.  
For example, here's how to use it with the Vercel AI SDK:

```ts
const schema = object({
  summary: string(),
  sentiment: string({ enum: ['positive', 'neutral', 'negative'] }),
})

await generateObject({
  model: openai(...),
  schema: jsonSchema(schema),
  prompt: 'Analyze this review: "Great product, works perfectly!"',
})
```

## 🔗 Using References

Use `$ref` to create reusable schema definitions and reference them throughout your schema:

```ts
const person = object({
  name: string(),
  age: number(),
})

const team = object({
  leader: $ref('person'),
  members: array($ref('person')),
})

team.$defs = { person }
```

> Read more about `$ref` and `$defs` in the [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/structuring#dollarref)

## 🔀 Using Union Types

Create union types using `anyOf` to allow multiple possible schemas:

```ts
const contact = anyOf([
  object({ email: string() }),
  object({ phone: string() }),
])
```

> Read more about `anyOf` in the [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/reference/combining#anyOf)

## 🤔 "But what about Zod?"

Great question! Zod is a versatile and comprehensive library, spanning thousands of lines of code. However, it's not specifically built for generating JSON Schemas, which can lead to unexpected results during conversion. In contrast, JSON Schema Kit provides full control — all in under 100 lines of code.
