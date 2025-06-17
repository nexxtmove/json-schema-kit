export type NullableSchema =
  | StringSchema
  | NumberSchema
  | IntegerSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema

export type Schema = NullableSchema | AnyOfSchema | RefSchema

export type BaseSchema<T> = {
  title?: string
  description?: string
  const?: T
  enum?: T[]
}

export type StringSchema = BaseSchema<string> & {
  type: 'string' | ['string', 'null']
  pattern?: string
  format?: string
}

export type NumberSchema = BaseSchema<number> & {
  type: 'number' | ['number', 'null']
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
}

export type IntegerSchema = Omit<NumberSchema, 'type'> & {
  type: 'integer' | ['integer', 'null']
}

export type BooleanSchema = BaseSchema<boolean> & {
  type: 'boolean' | ['boolean', 'null']
}

export type ObjectSchema = BaseSchema<any> & {
  type: 'object' | ['object', 'null']
  properties: Record<string, Schema>
  required: string[]
  additionalProperties: boolean
  $defs?: Record<string, Schema>
}

export type ArraySchema = BaseSchema<any[]> & {
  type: 'array' | ['array', 'null']
  items: Schema
  minItems?: number
  maxItems?: number
}

export type AnyOfSchema = {
  anyOf: ObjectSchema[]
}

export type RefSchema = {
  $ref: string
}
