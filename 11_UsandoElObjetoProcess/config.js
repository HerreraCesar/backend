import 'dotenv/config'

import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'

const {port} = yargs(hideBin(process.argv))
  .alias({
    p: 'port'
  })
  .default({
    port: 8080
  })
  .argv

export default { 
  mongodb: {
    connectionString: process.env.MONGO
  },
  arguments: {
    port: port
  },
  variables: {
    platform: process.env.OS,
    node: process.version,
    memory: process.memoryUsage.rss(),
    path: process.argv[1],
    id: process.pid,
    folder: process.cwd()
  }
}


