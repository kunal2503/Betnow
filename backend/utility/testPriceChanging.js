// const mongoose = require('mongoose');
// const Event = require('../model/event');
// const { priceChanger } = require('./priceChangeing');

// // Test configuration
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/opinion-betting';

// async function testPriceChanging() {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(MONGODB_URI);
//         console.log('Connected to MongoDB');

//         // Create a test event
//         const testEvent = new Event({
//             title: "Test Event - Price Changing",
//             category: "test",
//             description: "Testing price changing utility",
//             startTime: new Date(),
//             endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
//             status: "live",
//             createdBy: new mongoose.Types.ObjectId(), // Dummy user ID
//             yesPrice: 5,
//             noPrice: 5,
//             totalYesAmount: 1000,
//             totalNoAmount: 1000
//         });

//         await testEvent.save();
//         console.log('Test event created:', testEvent._id);

//         // Test 1: Initial prices
//         console.log('\n=== Initial Prices ===');
//         console.log(`YES: ${testEvent.yesPrice}, NO: ${testEvent.noPrice}`);

//         // Test 2: Place a YES bet
//         console.log('\n=== Placing YES bet of $500 ===');
//         const yesResult = await priceChanger.updatePricesAfterBet(
//             testEvent._id,
//             'yes',
//             500
//         );
//         console.log('Result:', yesResult);

//         // Test 3: Place a NO bet
//         console.log('\n=== Placing NO bet of $300 ===');
//         const noResult = await priceChanger.updatePricesAfterBet(
//             testEvent._id,
//             'no',
//             300
//         );
//         console.log('Result:', noResult);

//         // Test 4: Calculate implied probability
//         const updatedEvent = await Event.findById(testEvent._id);
//         const probability = priceChanger.calculateImpliedProbability(
//             updatedEvent.yesPrice,
//             updatedEvent.noPrice
//         );
//         console.log('\n=== Implied Probabilities ===');
//         console.log(`YES: ${probability.yesProbability.toFixed(2)}%`);
//         console.log(`NO: ${probability.noProbability.toFixed(2)}%`);

//         // Test 5: Reset prices
//         console.log('\n=== Resetting prices ===');
//         const resetResult = await priceChanger.resetPrices(testEvent._id);
//         console.log('Reset result:', resetResult);

//         // Clean up
//         await Event.findByIdAndDelete(testEvent._id);
//         console.log('\nTest event cleaned up');

//     } catch (error) {
//         console.error('Test failed:', error);
//     } finally {
//         await mongoose.disconnect();
//         console.log('Disconnected from MongoDB');
//     }
// }

// // Run the test if this file is executed directly
// if (require.main === module) {
//     testPriceChanging();
// }

// module.exports = { testPriceChanging };
