import { DailyHabit } from "./domain/entity/DailyHabit"
import { Habit } from "./domain/entity/Habit"

const express = require('express')
const app = express()
const { Pool } = require("pg")
const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: '5432'
})

const connectDb = async () => {
    try {
        await client.connect()
        console.log('conectado')
    } catch (error) {
        console.log(error)
    }
}

app.use(express.json())

app.post('/habit', async (req:any, res:any) => {
    const nameHabit = req.body.name
    await client.query(`insert into habits (name) values ($1)`,[req.body.name])
    res.json({req: 'habit added sucessfully'})
    await client.end()
})

app.get('/habit', async (req:any, res:any) => {
    const dbResponse = await client.query('select * from habits')
    res.json(dbResponse.rows)
    await client.end()
    
})

app.listen(2000,function(erro:any){
    if(erro){
        console.log("Ocorreu um erro!")
    }else{
        connectDb()
        console.log("Servidor iniciado com sucesso")
    }
})
