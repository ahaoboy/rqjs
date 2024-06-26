import assert from 'assert'

assert(true)


try {
  assert(false)
} catch (e) {
  console.log(e)
}