const db = require('../db')

const main = async () => {
    await db.sync({
      force: true
    })
    process.exit()
  }
  main()