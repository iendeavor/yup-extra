import './'
import { string, array } from 'yup'
import { expectType } from 'ts-expect'

import type { AnySchema, StringSchema } from 'yup'
import type { Message } from 'yup/es/types'
import type { TypeEqual } from 'ts-expect'

expectType<TypeEqual<typeof string['prototype']['json'], (schema: AnySchema, message?: Message) => StringSchema>>(true)
expectType<TypeEqual<typeof string['prototype']['json'], any>>(false)

const subSchema = array().strict().required().of(string().strict())
const schema = string().json(subSchema)

it('should validate subtype (sync)', () => {
  expect(schema.isValidSync(undefined)).toBe(true)
  expect(schema.isValidSync('[]')).toBe(true)
  expect(schema.isValidSync('["foo"]')).toBe(true)

  expect(schema.isValidSync('')).toBe(false)
  expect(schema.isValidSync('42')).toBe(false)
  expect(schema.isValidSync('[42]')).toBe(false)
})

it('should validate subtype (async)', async () => {
  expect(await schema.isValid(undefined)).toBe(true)
  expect(await schema.isValid('[]')).toBe(true)
  expect(await schema.isValid('["foo"]')).toBe(true)

  expect(await schema.isValid('')).toBe(false)
  expect(await schema.isValid('42')).toBe(false)
  expect(await schema.isValid('[42]')).toBe(false)
})
