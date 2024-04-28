require('dotenv/config');

const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

const app = express();
app.use(express.json()); //TODO: app.use(express.json({ limit: "50mb" }));

//*************************************************************************************************
// GETS
//*************************************************************************************************

////////////////////////////////////////////////////////////////////////
///  Guests table: Return the top X records
////////////////////////////////////////////////////////////////////////
router.get('/getGuests', async (req, res) => {
  const topX = req.query.topX;

  if (topX === undefined)
    res.end();

  try {
    const guests = Schemas.Guests;
    const guestsRecords = await guests.find({}).sort({ LastName: 1 }).limit(topX).clone();;

    // if (!guestsRecords) {
    //   guests.create({
    //     GuildID: interaction.guild.id,
    //     UserID: interaction.user.id,
    //   });
    // }

    if (guestsRecords) {
      // console.log(JSON.stringify(guestsRecords));
      res.end(JSON.stringify(guestsRecords));
    }
  } catch (error) {
    console.end(error);
  }
  res.end();
});



// router.get('/getGuestsOld', async (req, res) => {
//   const topX = req.query.topX;

//   if (topX === undefined)
//     res.end();

//   const guests = Schemas.Guests;

//   // this code will get the topX records from the Guests table
//   const guestsRecords = await guests.find({}, (err, guestsData) => {
//     if (err) throw err;
//     if (guestsData) {
//       res.end(JSON.stringify(guestsData));
//     } else {
//       res.end();
//     }
//   }).sort({ LastName: -1 })
//     .limit(topX).clone();
// });


// router.get('/getHello', async (req, res) => {
//   res.write("Hello World!");
//   res.end();
// });


module.exports = router;