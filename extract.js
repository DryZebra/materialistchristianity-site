const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\Put new stuff here\\Materialist Christianity Research Outline.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('research_outline.txt', data.text);
    console.log('Done');
}).catch(function(error) {
    console.error(error);
});
