export default function pullRequest({ body }) {
  return new Promise((resolve, reject) => {
    console.log(`body['pull_request']['user']`, body['pull_request']['user'])
    resolve({ received: true })
  })
}
