import { Router } from 'express'

export default function gittokenAPI () {
  let router = Router()

  router.get('/', (req, res, next) => {
    console.log('gittokenAPI::this.sqliteDB', this.sqliteDB)
  })

  return router
}
