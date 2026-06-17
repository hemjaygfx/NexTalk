import express from 'express';

    const router = express.Router();

    // Message endpoint 
router.get('/send', (req, res) => {
    res.send('Send Message endpoint');
}); 

export default router;
