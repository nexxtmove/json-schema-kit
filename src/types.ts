export type Schema = StringSchema | NumberSchema | IntegerSchema | BooleanSchema | ArraySchema | ObjectSchema | NullSchema | RefSchema | AnyOfSchema

export type BaseSchema<T> = {
  title?: string
  description?: string
  const?: T
  enum?: T[]
}

export type StringSchema = BaseSchema<string> & {
  type: 'string'
  pattern?: string
  format?: string
}

export type NumberSchema = BaseSchema<number> & {
  type: 'number'
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
}

export type IntegerSchema = Omit<NumberSchema, 'type'> & {
  type: 'integer'
}

export type BooleanSchema = BaseSchema<boolean> & {
  type: 'boolean'
}

export type ObjectSchema = BaseSchema<Record<string, any>> & {
  type: 'object'
  properties: Record<string, Schema>
  required: string[]
  additionalProperties: boolean
  $defs?: Record<string, Schema>
}

export type ArraySchema = BaseSchema<any[]> & {
  type: 'array'
  items: Schema
  minItems?: number
  maxItems?: number
}

export type NullSchema = {
  type: 'null'
}

export type RefSchema = {
  $ref: string
}

export type AnyOfSchema = {
  anyOf: Schema[]
}
