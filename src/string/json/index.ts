import { addMethod, string, isSchema } from 'yup'
import isAbsent from 'yup/es/util/isAbsent'
import printValue from 'yup/es/util/printValue'

import type { AnySchema, StringSchema } from 'yup'
import type { Maybe, Message } from 'yup/es/types'

declare module 'yup' {
  interface StringSchema {
    json(schema: AnySchema, message?: Message): StringSchema
  }
}

const name = 'json'
addMethod(
  string,
  name,
  function (this: StringSchema, schema: AnySchema, message = '${path} must match given json schema') {
    if (isSchema(schema) === false)
      throw new TypeError(`\`string.${name}()\` sub-schema must be a valid yup schema not: ` + printValue(schema))

    return this.test({
      name,
      message,
      params: {
        schema,
      },
      test(value: Maybe<string>) {
        if (isAbsent(value)) return true

        try {
          const parsedValue = JSON.parse(value)
          if ((this.options as any).sync) {
            try {
              schema.validateSync(parsedValue)
              return true
            } catch (error) {
              return this.createError({ params: { json: error } })
            }
          } else {
            return schema
              .validate(parsedValue)
              .then(() => {
                return true
              })
              .catch(error => {
                return this.createError({ params: { json: error } })
              })
          }
        } catch (error) {
          return this.createError({ params: { json: error } })
        }
      },
    })
  },
)
