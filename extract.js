const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\Put new stuff here\\AI Cult Panic Article Workflow.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('ai_cult_panic.txt', data.text);
    console.log('Done');
}).catch(function(error) {
    console.error(error);
});
