const router = require('express').Router();
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1143822",
    key: "7674db2fe393342a6a78",
    secret: "b25d5dc797cd999625a5",
    cluster: "ap2",
    useTLS: true
});

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {
    pusher.trigger("game-poll", "game-vote", {
        points: 1,
        game: req.body.game,
    });
    return res.json({
        success: true,
        message: 'Thank You for voting'
    })
})

module.exports = router;