const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const newOpportunity = JSON.parse(event.body);
        const opportunityFilePath = path.join(__dirname, '..', 'opportunity.json');
        const data = fs.readFileSync(opportunityFilePath, 'utf8');
        const opportunities = JSON.parse(data);
        
        newOpportunity.id = opportunities.length + 1;
        opportunities.push(newOpportunity);
        fs.writeFileSync(opportunityFilePath, JSON.stringify(opportunities, null, 2));
        
        return {
            statusCode: 201,
            body: JSON.stringify(newOpportunity),
        };
    } catch (error) {
        console.error('Error writing opportunity data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
