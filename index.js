const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const opportunityFilePath = path.join(__dirname, 'opportunity.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function readOpportunityData() {
    try {
        const data = fs.readFileSync(opportunityFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading opportunity data:', err);
        return [];
    }
}

function writeOpportunityData(data) {
    try {
        fs.writeFileSync(opportunityFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing opportunity data:', err);
    }
}

app.get('/', (req, res) => {
    // Serve your API documentation or homepage
    res.send('Welcome to my API!');
});

app.get('/opportunities', (req, res) => {
    const opportunities = readOpportunityData();
    res.json(opportunities);
});

app.post('/opportunities', (req, res) => {
    const newOpportunity = req.body;
    const opportunities = readOpportunityData();
    newOpportunity.id = opportunities.length + 1;
    opportunities.push(newOpportunity);
    writeOpportunityData(opportunities);
    res.status(201).json(newOpportunity);
});

app.get('/opportunities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const opportunities = readOpportunityData();
    const opportunity = opportunities.find(opp => opp.id === id);
    if (opportunity) {
        res.json(opportunity);
    } else {
        res.status(404).json({ message: 'Opportunity not found' });
    }
});

app.post('/opportunities/:id/articles', (req, res) => {
    const id = parseInt(req.params.id);
    const opportunities = readOpportunityData();
    const opportunityIndex = opportunities.findIndex(opp => opp.id === id);
    if (opportunityIndex !== -1) {
        const newArticle = req.body;
        newArticle.id = opportunities[opportunityIndex].articles.length + 1;
        newArticle.opportunityId = id;
        opportunities[opportunityIndex].articles.push(newArticle);
        writeOpportunityData(opportunities);
        res.status(201).json(newArticle);
    } else {
        res.status(404).json({ message: 'Opportunity not found' });
    }
});

// Serve static files (optional)
// app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
