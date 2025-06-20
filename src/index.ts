import type { Schema, StringSchema, NumberSchema, IntegerSchema, BooleanSchema, ObjectSchema, ArraySchema, AnyOfSchema, RefSchema, AnyOfable } from './types'

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

export function anyOf(subschemas: AnyOfable[]): AnyOfSchema {
  return {
    anyOf: subschemas,
  }
}

// If schema doesn't have a `type` property, it will be converted to an AnyOfSchema
export type NullableSchema<T> = T extends { type: any } ? T : AnyOfSchema

export function nullable<T extends Schema>(schema: T): NullableSchema<T> {
  if ('type' in schema) {
    return { ...schema, type: [schema.type, 'null'] } as NullableSchema<T>
  }

  if ('anyOf' in schema) {
    return anyOf([...schema.anyOf, { type: 'null' }]) as NullableSchema<T>
  }

  return anyOf([schema, { type: 'null' }]) as NullableSchema<T>
}
