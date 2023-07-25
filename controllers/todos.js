const Todo = require('../models/Todo.js');

module.exports = {
  // getTodos: async (req, res) => {
  //   try {
  //     const allTodos = await Todo.find({userId:req.user.id});
  //     res.render('todos.ejs', {todos: allTodos})
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  createTodo: async (req, res) => {
    try {
        await Todo.create({
            title: req.body.todoTitle,
            content: req.body.todoItem, 
            status: 'todo',
            board: req.params.id
            // userId: req.user.id
        })
        console.log('Todo Added')
        // res.redirect('/todo')
        res.redirect('/board/' + req.params.id)
        document.querySelector('.display-form-button').style.display='block'
    } catch (error) {
        console.log(error);
    }
  },
  markTodo: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'todo'
        })
    } catch (error) {
      console.log(error);
    }
  },
  markDoing: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'doing'
        })
        console.log('Marked as doing')
        res.json({
          status:'doing'
        })
    } catch (error) {
      console.log(error);
    }
  },
  markDone: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'done'
        })
        res.json({
          status:'done'
        })
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
        await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
        console.log('Deleted Todo')
            res.json('Deleted It')
    } catch (error) {
      console.log(error);
    }
  },
  updateContent: async (req,res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
      await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile}, {
        title: req.body.updatedTitleFromModal,
        content: req.body.updatedContentFromModal
      })
      res.json('updated content')
    } catch (error) {
      console.log(error)
    }
  },
  searchPhotos: async (req, res) => {
    try {
      const {searchInput } = req.query

      const response = await req.unsplash.search.getPhotos({
        query: searchInput,
        per_page: 50,
      })

      const photos = response.response.results
      res.json({ photos })
    }
    catch (error) {
      console.log(error)
    }
  },
  updateCoverPhoto: async (req,res) => {
    console.log(req.body.coverPhotoUrl)
    try {
      await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile}, {
        coverPhoto: req.body.coverPhotoUrl
      })
      res.json('cover photo updated')
    } catch (error) {
      console.log(error)
    }
  }
}
