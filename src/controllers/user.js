import User from "../models/user.js"
import jwt from "jsonwebtoken"

class UserControllers {
  static async createUser(req, res) {
    try {
      const { username, email, password, avatarUrl } = req.body

      const user = await User.create({
        username,
        email,
        password,
        avatarUrl
      })

      res.status(201).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }

  static async findAll(req, res) {
    try {
      const user = await User.find()

      res.send({user})
    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      res.send({user})
    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params
      const {  password, avatarUrl } = req.body

      const userUpdated = await User.findByIdAndUpdate(id, {
        password, avatarUrl, updatedAt: new Date(), new: true
      }, {
        returnDocument: "after"
      })

      res.json(userUpdated)
    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }
  
  static async deleteUser(req, res) {
    try {
      const { id } = req.params

      await User.findByIdAndRemove(id)
      
      res.status(204).json({})
    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }

  static async login(req, res) {
    try {
      const {email, password} = req.body

      const user = await User.findOne({
        email
      }).select("+password")

      
      if (!user) {
        throw new Error("usuario nao encontrado")
        
      }
      
      if (user.password !== password) {
        res.status(400).json({"error": "senha invalida"})
      }

      const token = jwt.sign({
        id: user.id
      }, process.env.SECRET, {expiresIn: "1d"})

      res.json({token})

    } catch (error) {
      console.log(error)
      res.status(500).json({"error": "aconteceu algo de errado."})
    }
  }
}

export default UserControllers