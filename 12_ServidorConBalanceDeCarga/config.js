import 'dotenv/config'

import { hideBin } from 'yargs/helpers'
import os from 'os'
import yargs from 'yargs'

const {port, mode} = yargs(hideBin(process.argv))
  .alias({
    p: 'port',
    m: 'mode'
  })
  .default({
    port: 8080,
    mode: 'fork'
  })
  .argv

export default { 
  mongodb: {
    connectionString: process.env.MONGO
  },
  arguments: {
    port: port,
    mode: mode
  },
  variables: {
    platform: process.env.OS,
    node: process.version,
    memory: process.memoryUsage.rss(),
    path: process.argv[1],
    id: process.pid,
    folder: process.cwd(),
    processors: os.cpus().length
  }
}


