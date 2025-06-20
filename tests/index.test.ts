import { string, number, integer, boolean, object, array, $ref, anyOf, nullable } from '../src/index'

describe('JSON Schema Kit', () => {
  describe('string()', () => {
    it('should create basic string schema', () => {
      const result = string()
      expect(result).toEqual({
        type: 'string',
      })
    })

    it('should accept additional properties', () => {
      const result = string({
        description: 'A name field',
        pattern: '^[A-Za-z]+$',
        format: 'email',
      })
      expect(result).toEqual({
        type: 'string',
        description: 'A name field',
        pattern: '^[A-Za-z]+$',
        format: 'email',
      })
    })

    it('should preserve custom properties', () => {
      const result = string({
        title: 'Name',
        const: 'fixed-value',
        enum: ['option1', 'option2'],
      })
      expect(result).toEqual({
        type: 'string',
        title: 'Name',
        const: 'fixed-value',
        enum: ['option1', 'option2'],
      })
    })
  })

  describe('number()', () => {
    it('should create basic number schema', () => {
      const result = number()
      expect(result).toEqual({
        type: 'number',
      })
    })

    it('should accept additional properties', () => {
      const result = number({
        description: 'Price in dollars',
        minimum: 0,
        maximum: 1000,
        multipleOf: 0.01,
      })
      expect(result).toEqual({
        type: 'number',
        description: 'Price in dollars',
        minimum: 0,
        maximum: 1000,
        multipleOf: 0.01,
      })
    })

    it('should handle exclusive bounds', () => {
      const result = number({
        exclusiveMinimum: 0,
        exclusiveMaximum: 100,
      })
      expect(result).toEqual({
        type: 'number',
        exclusiveMinimum: 0,
        exclusiveMaximum: 100,
      })
    })
  })

  describe('integer()', () => {
    it('should create basic integer schema', () => {
      const result = integer()
      expect(result).toEqual({
        type: 'integer',
      })
    })

    it('should accept additional properties', () => {
      const result = integer({
        description: 'Age in years',
        minimum: 0,
        maximum: 120,
      })
      expect(result).toEqual({
        type: 'integer',
        description: 'Age in years',
        minimum: 0,
        maximum: 120,
      })
    })
  })

  describe('boolean()', () => {
    it('should create basic boolean schema', () => {
      const result = boolean()
      expect(result).toEqual({
        type: 'boolean',
      })
    })

    it('should accept additional properties', () => {
      const result = boolean({
        description: 'Is active',
        const: true,
      })
      expect(result).toEqual({
        type: 'boolean',
        description: 'Is active',
        const: true,
      })
    })
  })

  describe('object()', () => {
    it('should create basic object schema', () => {
      const result = object({
        name: string(),
        age: number(),
      })
      expect(result).toEqual({
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
        required: ['name', 'age'],
        additionalProperties: false,
      })
    })

    it('should accept additional properties', () => {
      const result = object(
        {
          name: string(),
        },
        {
          description: 'A person object',
          title: 'Person',
          additionalProperties: true,
        },
      )
      expect(result).toEqual({
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
        additionalProperties: true,
        description: 'A person object',
        title: 'Person',
      })
    })

    it('should handle nested objects', () => {
      const result = object({
        user: object({
          name: string(),
          email: string({ format: 'email' }),
        }),
        metadata: object({
          createdAt: string({ format: 'date-time' }),
        }),
      })
      expect(result).toEqual({
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
            required: ['name', 'email'],
            additionalProperties: false,
          },
          metadata: {
            type: 'object',
            properties: {
              createdAt: { type: 'string', format: 'date-time' },
            },
            required: ['createdAt'],
            additionalProperties: false,
          },
        },
        required: ['user', 'metadata'],
        additionalProperties: false,
      })
    })

    it('should handle $defs', () => {
      const personSchema = object({
        name: string(),
        age: number(),
      })

      const result = object(
        {
          leader: $ref('person'),
        },
        {
          $defs: { person: personSchema },
        },
      )

      expect(result).toEqual({
        type: 'object',
        properties: {
          leader: { $ref: '#/$defs/person' },
        },
        required: ['leader'],
        additionalProperties: false,
        $defs: {
          person: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              age: { type: 'number' },
            },
            required: ['name', 'age'],
            additionalProperties: false,
          },
        },
      })
    })
  })

  describe('array()', () => {
    it('should create basic array schema', () => {
      const result = array(string())
      expect(result).toEqual({
        type: 'array',
        items: { type: 'string' },
      })
    })

    it('should accept additional properties', () => {
      const result = array(number(), {
        description: 'List of prices',
        minItems: 1,
        maxItems: 10,
      })
      expect(result).toEqual({
        type: 'array',
        items: { type: 'number' },
        description: 'List of prices',
        minItems: 1,
        maxItems: 10,
      })
    })

    it('should handle nested arrays', () => {
      const result = array(array(string()))
      expect(result).toEqual({
        type: 'array',
        items: {
          type: 'array',
          items: { type: 'string' },
        },
      })
    })

    it('should handle arrays of objects', () => {
      const result = array(
        object({
          id: integer(),
          name: string(),
        }),
      )
      expect(result).toEqual({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
          additionalProperties: false,
        },
      })
    })
  })

  describe('$ref()', () => {
    it('should create reference schema', () => {
      const result = $ref('person')
      expect(result).toEqual({
        $ref: '#/$defs/person',
      })
    })

    it('should handle different reference names', () => {
      expect($ref('user')).toEqual({ $ref: '#/$defs/user' })
      expect($ref('address')).toEqual({ $ref: '#/$defs/address' })
      expect($ref('nested-schema')).toEqual({ $ref: '#/$defs/nested-schema' })
    })
  })

  describe('anyOf()', () => {
    it('should create basic anyOf schema', () => {
      const result = anyOf([object({ email: string() }), object({ phone: string() })])
      expect(result).toEqual({
        anyOf: [
          {
            type: 'object',
            properties: { email: { type: 'string' } },
            required: ['email'],
            additionalProperties: false,
          },
          {
            type: 'object',
            properties: { phone: { type: 'string' } },
            required: ['phone'],
            additionalProperties: false,
          },
        ],
      })
    })

    it('should handle references in anyOf', () => {
      const result = anyOf([$ref('person'), $ref('company')])
      expect(result).toEqual({
        anyOf: [{ $ref: '#/$defs/person' }, { $ref: '#/$defs/company' }],
      })
    })

    it('should handle null in anyOf', () => {
      const result = anyOf([object({ name: string() }), { type: 'null' }])
      expect(result).toEqual({
        anyOf: [
          {
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name'],
            additionalProperties: false,
          },
          { type: 'null' },
        ],
      })
    })
  })

  describe('nullable()', () => {
    it('should make string nullable', () => {
      const result = nullable(string())
      expect(result).toEqual({
        anyOf: [{ type: 'string' }, { type: 'null' }],
      })
    })

    it('should make number nullable', () => {
      const result = nullable(number({ minimum: 0 }))
      expect(result).toEqual({
        anyOf: [{ type: 'number', minimum: 0 }, { type: 'null' }],
      })
    })

    it('should make integer nullable', () => {
      const result = nullable(integer())
      expect(result).toEqual({
        anyOf: [{ type: 'integer' }, { type: 'null' }],
      })
    })

    it('should make boolean nullable', () => {
      const result = nullable(boolean())
      expect(result).toEqual({
        anyOf: [{ type: 'boolean' }, { type: 'null' }],
      })
    })

    it('should make object nullable', () => {
      const result = nullable(object({ name: string() }))
      expect(result).toEqual({
        anyOf: [
          {
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name'],
            additionalProperties: false,
          },
          { type: 'null' },
        ],
      })
    })

    it('should make array nullable', () => {
      const result = nullable(array(string()))
      expect(result).toEqual({
        anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'null' }],
      })
    })

    it('should handle anyOf schemas', () => {
      const anyOfSchema = anyOf([object({ email: string() }), object({ phone: string() })])
      const result = nullable(anyOfSchema)
      expect(result).toEqual({
        anyOf: [
          {
            type: 'object',
            properties: { email: { type: 'string' } },
            required: ['email'],
            additionalProperties: false,
          },
          {
            type: 'object',
            properties: { phone: { type: 'string' } },
            required: ['phone'],
            additionalProperties: false,
          },
          { type: 'null' },
        ],
      })
    })

    it('should handle reference schemas', () => {
      const refSchema = $ref('person')
      const result = nullable(refSchema)
      expect(result).toEqual({
        anyOf: [{ $ref: '#/$defs/person' }, { type: 'null' }],
      })
    })
  })

  describe('Full example schemas', () => {
    it('should create a product schema', () => {
      const result = object({
        name: string(),
        price: number({ description: 'Price in dollars' }),
        discount: nullable(number()),
        tags: array(string()),
        dimensions: object({
          width: number(),
          height: number(),
        }),
      })

      expect(result).toEqual({
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number', description: 'Price in dollars' },
          discount: { anyOf: [{ type: 'number' }, { type: 'null' }] },
          tags: { type: 'array', items: { type: 'string' } },
          dimensions: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            },
            required: ['width', 'height'],
            additionalProperties: false,
          },
        },
        required: ['name', 'price', 'discount', 'tags', 'dimensions'],
        additionalProperties: false,
      })
    })

    it('should create a schema with references', () => {
      const person = object({
        name: string(),
        age: number(),
      })

      const team = object(
        {
          leader: $ref('person'),
          members: array($ref('person')),
        },
        {
          $defs: { person },
        },
      )

      expect(team).toEqual({
        type: 'object',
        properties: {
          leader: { $ref: '#/$defs/person' },
          members: { type: 'array', items: { $ref: '#/$defs/person' } },
        },
        required: ['leader', 'members'],
        additionalProperties: false,
        $defs: {
          person: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              age: { type: 'number' },
            },
            required: ['name', 'age'],
            additionalProperties: false,
          },
        },
      })
    })

    it('should create a union schema', () => {
      const contactInfo = anyOf([object({ email: string() }), object({ phone: string() })])

      expect(contactInfo).toEqual({
        anyOf: [
          {
            type: 'object',
            properties: { email: { type: 'string' } },
            required: ['email'],
            additionalProperties: false,
          },
          {
            type: 'object',
            properties: { phone: { type: 'string' } },
            required: ['phone'],
            additionalProperties: false,
          },
        ],
      })
    })
  })
})
