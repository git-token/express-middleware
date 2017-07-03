import { SMTPServer } from 'smtp-server'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'
import pem from 'pem'
import os from 'os'
import ip from 'ip'

export default function smtpServer ({ name, username, userpass, host, port }) {
  const HOST = host ? host : '127.0.0.1' //ip.address()
  const PORT = port ? port : 1752;
  const USERNAME = username ? username : 'GitToken'
  const USERPASS = userpass ? userpass : new Buffer(`${HOST}${new Date().toString()}`).toString('hex')
  pem.createCertificate({ days: 1, selfSigned: true }, (error, keys) => {
    if (error) { console.log(error) }
    const { serviceKey, certificate } = keys
    this.smtp = new SMTPServer({
      secure: false,
      name,
      // key: serviceKey,
      // cert: certificate 
    })

    this.smtp.listen(PORT, () => {

      this.smtpTransporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        secure: true,
        auth: {
          user: ``,
          pass: USERPASS
        }
      })

      this.smtpTransporter.sendMail({
        from: `"GitToken Helper" <${USERNAME}@${HOST}>`, // sender address
        to: 'ryan.michael.tate@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
      }, (error, info) => {
        console.log('smtpServer::error', error)
        console.log('smtpServer::info', info)
      })
      console.log(`SMTP Server running on host ${HOST} & port ${PORT}`)
    })
  })


}
