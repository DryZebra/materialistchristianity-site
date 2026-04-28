const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\Put new stuff here\\L-H-C Protocol AI Architecture Design.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('lhc_protocol.txt', data.text);
    console.log('Done');
}).catch(function(error) {
    console.error(error);
});
