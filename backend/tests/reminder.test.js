router.get('/test', (req, res, next) => {
    console.log(req.session.data);
    res.send();
})