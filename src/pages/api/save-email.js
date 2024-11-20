// pages/api/save-email.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    // Validate email using Hunter API
    const hunterApiKey = process.env.HUNTER_API_KEY; // Replace with your Hunter API key
    const googleScriptKey = process.env.GOOGLE_SCRIPT_KEY; // Replace with your Google Script key

    const validationResponse = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`);
    const validationData = await validationResponse.json();

    if (validationData.data.status !== 'valid') {
        return res.status(400).json({ message: 'Invalid email address. Please enter a valid email.' });
    }

    // Add email to Google Sheets
    const googleSheetsResponse = await fetch(`https://script.google.com/macros/s/${googleScriptKey}/exec`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'email': email,
        }),
    });
    const text = await googleSheetsResponse.text();

    if (text === 'Success') {
        return res.status(200).json({ message: "Thank you for joining our insider list! Stay tuned!", type: 'success' });
    } else if (text === 'Duplicate') {
        return res.status(200).json({ message: 'You are already on our insider list! Stay tuned!', type: 'warning' });
    } else {
        console.log(text);
        return res.status(500).json({ message: 'Oops! Something went wrong. Please try again to join our insider list.', type: 'error' });
    }
}