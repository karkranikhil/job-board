const fetch = require('node-fetch');
const baseURL ='https://jobs.github.com/positions.json'
async function fetchGithub(){
    let resultCount = 1
    let onPage = 0
    const allJobs =[]
    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`)
        const jobs = await res.json()
        allJobs.push(...jobs)
        resultCount = jobs.length
        onPage++;
    }
    console.log('Total Jobs', allJobs.length)
}
fetchGithub()
module.exports = fetchGithub;