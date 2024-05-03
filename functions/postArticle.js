const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const id = parseInt(event.pathParameters.id);
        const newArticle = JSON.parse(event.body);
        const opportunityFilePath = path.join(__dirname, '..', 'opportunity.json');
        const data = fs.readFileSync(opportunityFilePath, 'utf8');
        const opportunities = JSON.parse(data);
        const opportunityIndex = opportunities.findIndex(opp => opp.id === id);
        
        if (opportunityIndex !== -1) {
            newArticle.id = opportunities[opportunityIndex].articles.length + 1;
            newArticle.opportunityId = id;
            opportunities[opportunityIndex].articles.push(newArticle);
            fs.writeFileSync(opportunityFilePath, JSON.stringify(opportunities, null, 2));
            
            return {
                statusCode: 201,
                body: JSON.stringify(newArticle),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Opportunity not found' }),
            };
        }
    } catch (error) {
        console.error('Error writing opportunity data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
