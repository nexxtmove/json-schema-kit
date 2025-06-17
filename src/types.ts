export type Schema =
  | StringSchema
  | NumberSchema
  | IntegerSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | NullSchema
  | RefSchema
  | AnyOfSchema

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

export type ObjectSchema = BaseSchema<Record<string, any>> & {
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

export type NullSchema = {
  type: 'null'
}

export type RefSchema = {
  $ref: string
}

export type AnyOfable = ObjectSchema | RefSchema | NullSchema
export type AnyOfSchema = {
  anyOf: AnyOfable[]
}
