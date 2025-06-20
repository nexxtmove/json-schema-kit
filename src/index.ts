import type { Schema, StringSchema, NumberSchema, IntegerSchema, BooleanSchema, ObjectSchema, ArraySchema, AnyOfSchema, RefSchema } from './types'

export function string(properties: Partial<StringSchema> = {}): StringSchema {
  return {
    type: 'string',
    ...properties,
  }
}

export function number(properties: Partial<NumberSchema> = {}): NumberSchema {
  return {
    type: 'number',
    ...properties,
  }
}

export function integer(properties: Partial<IntegerSchema> = {}): IntegerSchema {
  return {
    type: 'integer',
    ...properties,
  }
}

export function boolean(properties: Partial<BooleanSchema> = {}): BooleanSchema {
  return {
    type: 'boolean',
    ...properties,
  }
}

export function object(members: Record<string, Schema>, properties: Partial<ObjectSchema> = {}): ObjectSchema {
  return {
    type: 'object',
    properties: members,
    required: Object.keys(members),
    additionalProperties: false,
    ...properties,
  }
}

export function array(itemSchema: Schema, properties: Partial<ArraySchema> = {}): ArraySchema {
  return {
    type: 'array',
    items: itemSchema,
    ...properties,
  }
}

export function $ref(id: string): RefSchema {
  return {
    $ref: `#/$defs/${id}`,
  }
}

export function anyOf(subschemas: Schema[]): AnyOfSchema {
  return {
    anyOf: subschemas,
  }
}

export function nullable(schema: Schema): AnyOfSchema {
  return 'anyOf' in schema
    ? anyOf([...schema.anyOf, { type: 'null' }]) // "Extend" existing anyOf with null
    : anyOf([schema, { type: 'null' }]) // Wrap schema in anyOf with null option
}
