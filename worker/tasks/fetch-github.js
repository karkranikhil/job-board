
const fetch = require('node-fetch');
const redis = require('redis')
const client = redis.createClient();
const {promisify} = require('util')
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const baseURL ='https://jobs.github.com/positions.json'
async function fetchGithub(){
    let resultCount = 1
    let onPage = 0
    const allJobs =[]
    //fetch all pages
    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`)
        const jobs = await res.json()
        allJobs.push(...jobs)
        resultCount = jobs.length
        onPage++;
    }
    //filter algo
    const jrJobs = allJobs.filter(job=>{
        const jobTitle = job.title.toLowerCase()
        // algo logic
        if(jobTitle.includes('senior')||
        jobTitle.includes('manager')||
        jobTitle.includes('sr.')||
        jobTitle.includes('architect')
        ){
            return false
        }
        return true
    })
    //setting redis
    console.log('Junior Jobs', jrJobs.length)
    const success = await setAsync('github', JSON.stringify(jrJobs))
    console.log({success})
}
//fetchGithub()
module.exports = fetchGithub;