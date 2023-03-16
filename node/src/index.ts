import { Resolver } from "dns"
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

app.post('/habit', async (req: any, res: any) => {
    await client.query(`insert into habits (name) values ($1)`, [req.body.name])
    res.json({ req: 'habit added sucessfully' })
    // await client.end()
})

app.get('/habit', async (req: any, res: any) => {
    let response = null
    if (req.query.id_group) {
        response = await client.query('select * from habits where id_group = $1', [req.query.id_group])
    } else {
        response = await client.query('select * from habits')
    }
    res.json(response.rows)
    // await client.end()

})

app.put('/habit',async (req: any, res: any) => {
    let response = null
    if(isNaN(req.query.id_habit)){
        res.status(404).send('the id need be a number')
    }else {
        response = await client.query('UPDATE habits SET name = $1 WHERE id = $2 RETURNING *', [req.query.name, req.query.id_habit], (err:any, result:any) => {
            if (err) {
                res.status(500).send('error editing habit')
            } else {
                if(result.rowCount === 0) {
                    res.status(404).send("No habit found to edit.");
                }else{
                    res.status(200).send('Successfully edited habit')

                }
            }
        })
    }
})

app.delete('/habit', async (req: any, res: any) => {
    let response = null
    if(req.body.id){
        response = await client.query('delete from habits where id = $1 returning *', [req.body.id], (err:any, result:any) => {
            if (err) {
                res.status(500).send('error deleting habit')
            } else {
                const numLines = result.rowCount;
                if (numLines === 0) {
                    res.status(404).send("No habit found for deletion.");
                } else {
                    res.status(200).send(`${numLines} habit(s) deleted.`);
                }
            }
        })
    }
})

app.post('/dailyhabit', async (req: any, res: any) => {
    await client.query('insert into dailyHabit (dailyhabit_date, id_user, id_habit, id_group, checked) values ($1, $2, $3, $4, $5)', [req.body.date, req.body.id_user, req.body.id_habit, req.body.id_group, 0])
    res.json({ req: 'daily habit added sucessfully' })
    // await client.end()
})

app.get('/dailyhabit', async (req: any, res: any) => {
    let response = null
    if (req.query.id_user) {
        response = await client.query('select * from dailyhabit where id_user = $1', [req.query.id_user])
    } else if (req.query.id_group) {
        response = await client.query('select * from dailyhabit where id_group = $1', [req.query.id_group])
    } else if (req.query.id_habit) {
        response = await client.query('select * from dailyhabit where id_habit = $1', [req.query.id_habit])
    } else if (req.query.checked) {
        response = await client.query('select * from dailyhabit where checked = $1', [req.query.checked])
    } else {
        response = await client.query('select * from dailyHabit')
    }
    res.json(response.rows)
    // await client.end()
})

app.delete('/dailyhabit', async (req: any, res: any) => {
    let response = null
    if(req.body.id){
        response = await client.query('delete from dailyhabit where id = $1 returning *', [req.body.id], (err:any, result:any) => {
            if (err) {
                res.status(500).send('error deleting daily habit')
            } else {
                const numLines = result.rowCount;
                if (numLines === 0) {
                    res.status(404).send("No daily habit found for deletion.");
                } else {
                    res.status(200).send(`${numLines} daily habit(s) deleted.`);
                }
            }
        })
    }
})

app.post('/user', async (req: any, res: any) => {
    await client.query('insert into users (nameUser, passwordUser) values ($1, $2)', [req.body.name, req.body.password])
    res.json({ req: 'user added sucessfully' })
    // await client.end()
})

app.get('/user', async (req: any, res: any) => {
    const dbResponse = await client.query('select * from users')
    res.json(dbResponse.rows)
    console.log(dbResponse.rows)
    console.log('teste')
    // await client.end()
})

app.post('/group', async (req: any, res: any) => {
    await client.query('insert into groups (namegroup) values ($1)', [req.body.name])
    res.json({ req: 'group added sucessfully' })
    // await client.end()
})

app.get('/group', async (req: any, res: any) => {
    const dbResponse = await client.query('select * from groups')
    res.json(dbResponse.rows)
    console.log(dbResponse.rows)
    // await client.end()
})

app.post('/add_user_group', async (req: any, res: any) => {
    await client.query('insert into relation_user_group (id_user, id_group) values ($1, $2)', [req.body.id_user, req.body.id_group])
    res.json({ req: 'user added in group sucessfully' })
    // await client.end()
})

app.get('/add_user_group', async (req: any, res: any) => {
    const dbResponse = await client.query('select * from relation_user_group')
    res.json(dbResponse.rows)
    // await client.end()
})

app.listen(2000, function (erro: any) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        connectDb()
        console.log("Servidor iniciado com sucesso")
    }
})
