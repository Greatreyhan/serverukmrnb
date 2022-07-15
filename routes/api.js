const router = require('express').Router()
const apiController = require('../controllers/apiController')

// endpoint article
router.get('/articles/:articleid', apiController.getDetailArticle)
router.get('/articles-menu', apiController.getArticlesMenu)
router.get('/articles-menu-all', apiController.getArticlesMenuAll)
router.get('/articles-trending', apiController.getTrendingArticles)
router.get('/tags', apiController.getTags)
router.get('/tags/:tagid', apiController.getArticlesByTag)
router.get('/competitions-menu', apiController.getCompetitionMenu)


module.exports = router