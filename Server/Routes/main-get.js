const router = require('express').Router();
let sessions = require('../Utils/session');

module.exports = router.get('/', (req, res) => {
	try {
		sessions.id++;
		sessions.session.push({ id: sessions.id, x: 0, y: 0 });
		const temp = sessions.session.filter(s => s.id != sessions.id);
		res.render('index.ejs', { id: sessions.id, session: temp });
	} catch(e) {
		console.log(e);
		res.json(501, { error: 'Internal Server Error' });
	}
});