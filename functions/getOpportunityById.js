const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const id = parseInt(event.pathParameters.id);
        const opportunityFilePath = path.join(__dirname, '..', 'opportunity.json');
        const data = fs.readFileSync(opportunityFilePath, 'utf8');
        const opportunities = JSON.parse(data);
        const opportunity = opportunities.find(opp => opp.id === id);
        
        if (opportunity) {
            return {
                statusCode: 200,
                body: JSON.stringify(opportunity),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Opportunity not found' }),
            };
        }
    } catch (error) {
        console.error('Error reading opportunity data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
