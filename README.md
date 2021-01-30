# yup-extra

> yup-extra adds more useful methods that aren't included in the [yup](https://github.com/jquense/yup) library

[![npm](https://img.shields.io/npm/v/yup-extra)](https://www.npmjs.com/package/yup-extra)
[![CI](https://github.com/iendeavor/yup-extra/actions/workflows/ci.yml/badge.svg)](https://github.com/iendeavor/yup-extra/actions/workflows/ci.yml)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## Getting Started

### Installation

```sh
npm install -S yup-extra
```

### Import

On demand:

```typescript
// Pattern: `yup-extra/${format}/${schema}/${method}`

// for ES6 Modules package
import 'yup-extra/es/string/json'

// for CommonJS package
require('yup-extra/lib/string/json')
```

## API

### `string`

#### `string.json(type: AnySchema): Schema`

Specify the schema of json.

```typescript
import { string, number } from 'yup'
import 'yup-extra/es/string/json'

const value = JSON.stringify('foo')
const schema = string().json(number()).required()

schema.validate(value).catch(function (err) {
  console.log(err.name) // => 'ValidationError'
  console.log(err.errors) // => ['this must match given json schema']
  console.log(err.params.json.errors) // => ['this must be a `number` type, but the final value was: `NaN` (cast from the value `\"foo\"`).']
})
```
