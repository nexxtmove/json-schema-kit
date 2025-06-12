export type Object = Record<string, Schema>

export type Schema<T = unknown> = {
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  anyOf?: Schema<T>[]
  $ref?: string

  items?: Schema
  description?: string
  const?: T
  enum?: T[]

  properties?: Object
  required?: string[]
  additionalProperties?: boolean

  $defs?: Object
}

export function string(schema: Schema<string> = {}): Schema<string> {
  return {
    type: 'string',
    ...schema,
  }
}

export function boolean(schema: Schema<boolean> = {}): Schema<boolean> {
  return {
    type: 'boolean',
    ...schema,
  }
}

export function number(schema: Schema<number> = {}): Schema<number> {
  return {
    type: 'number',
    ...schema,
  }
}

export function array<T>(itemSchema: Schema<T>, schema: Schema<T[]> = {}): Schema<T[]> {
  return {
    type: 'array',
    items: itemSchema,
    ...schema,
  }
}

export function object(properties: Object, schema: Schema<Object> = {}): Schema<Object> {
  return {
    type: 'object',
    properties,
    required: Object.keys(properties),
    additionalProperties: false,
    ...schema,
  }
}

export function extend(schema: Schema<Object>, properties: Object): void {
  for (const [key, value] of Object.entries(properties)) {
    schema.properties![key] = value
    schema.required!.push(key)
  }
}

export function anyOf<T>(subschemas: Schema<T>[], schema: Schema<T> = {}): Schema<T> {
  return {
    anyOf: subschemas,
    ...schema,
  }
}

export function $ref<T>(id: string, schema: Schema<T> = {}): Schema<T> {
  return {
    $ref: `#/$defs/${id}`,
    ...schema,
  }
}
