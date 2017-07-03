import level from 'level'
import hyperlog from 'hyperlog'


export default function gittokenHyperlog() {
  let dbPath = `${this.dirPath}/gittoken`;
  this.gittokenDB = level(dbPath)
  this.gittokenLog = hyperlog(this.gittokenDB)
  console.log('GitToken Hyperlog Instance Running')
}
