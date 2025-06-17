export type Schema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | AnyOfSchema
  | RefSchema

export type BaseSchema<T> = {
  title?: string
  description?: string
  const?: T
  enum?: T[]
}

export type StringSchema = BaseSchema<string> & {
  type: 'string'
  pattern?: string
  format?:
    | 'date-time'
    | 'time'
    | 'date'
    | 'duration'
    | 'email'
    | 'hostname'
    | 'ipv4'
    | 'ipv6'
    | 'uuid'
}

export type NumberSchema = BaseSchema<number> & {
  type: 'number'
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
}

export type BooleanSchema = BaseSchema<boolean> & {
  type: 'boolean'
}

export type ObjectSchema = BaseSchema<any> & {
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

export type AnyOfSchema = {
  anyOf: ObjectSchema[]
}

export type RefSchema = {
  $ref: string
}
