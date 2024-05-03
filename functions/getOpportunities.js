const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const opportunityFilePath = path.join(__dirname, '..', 'opportunity.json');
        const data = fs.readFileSync(opportunityFilePath, 'utf8');
        const opportunities = JSON.parse(data);
        
        return {
            statusCode: 200,
            body: JSON.stringify(opportunities),
        };
    } catch (error) {
        console.error('Error reading opportunity data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
