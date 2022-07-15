const Article = require("../models/Article")
const Competition = require("../models/Competition")
const Tag = require('../models/Tag')

module.exports = {
    getArticlesMenu : async (req,res) =>{
        try{
            const articlesMenu = await Article.find().select('_id imageUrl title date description authorId tagId').limit(10).populate({path:'authorId', select:'_id name imageUrl'}).populate({path: 'tagId',select:'_id name'})
            res.status(200).json({articlesMenu})
        }
        catch(error){
            console.log(error)
        }
    },
    getArticlesMenuAll : async (req,res) =>{
        try{
            const articlesMenuAll = await Article.find().select('_id imageUrl title date description authorId tagId').populate({path:'authorId', select:'_id name imageUrl'}).populate({path: 'tagId',select:'_id name'})
            res.status(200).json({articlesMenuAll})
        }
        catch(error){
            console.log(error)
        }
    },
    getTrendingArticles : async (req,res) =>{
        try {
            const articlesTrending = await Article.find().sort({reader:1}).limit(6).select('_id imageUrl title date description authorId tagId').populate({path:'authorId', select:'_id name imageUrl'}).populate({path: 'tagId',select:'_id name'})
            res.status(200).json({articlesTrending})
        } catch (error) {
            console.log(error)
        }
    },
    getDetailArticle : async(req,res) =>{
        try {
            const {articleid} = req.params;
            const article = await Article.findOne({_id:articleid}).populate({path:'authorId', select:'_id name imageUrl occupation city instagram twitter linkedin'}).populate({path: 'tagId',select:'_id name'})
            article.reader += 1;
            await article.save();
            res.status(200).json({article})
        } catch (error) {
            
        }
    },
    getTags : async (req,res) =>{
        try {
            const tags = await Tag.find()
            res.status(200).json({tags})
        } catch (error) {
            
        }
    },
    getArticlesByTag : async (req,res) =>{
        try {
            const {tagid} = req.params;
            const articles = await Tag.findOne({_id:tagid}).populate({path:'articleId', select:'_id imageUrl title date description authorId tagId', perDocumentLimit:10, populate:{path:'authorId', select:'_id name imageUrl occupation city instagram twitter linkedin'}})
            res.status(200).json({articles})
        } catch (error) {
            console.log(error)
        }
    },
    getCompetitionMenu : async (req,res) =>{
        try{
            const competitionsMenu = await Competition.find().select('_id imageUrl title date link deadline company description')
            res.status(200).json({competitionsMenu})
        }
        catch(error){
            console.log(error)
        }
    },
}