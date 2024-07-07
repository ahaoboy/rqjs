import { spawn } from 'child_process'

{
  const cmd = spawn('ls')
  cmd.stdout.on('data', (s) => {
    console.log('ls:', s.toString())
  })
}

{
  const cmd = spawn('ls', ['-lh'])
  cmd.stdout.on('data', (s) => {
    console.log('ll:', s.toString())
  })
}