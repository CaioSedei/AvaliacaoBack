import express from 'express';
import db from './repository/index.js';

const app = express()
app.use(express.json())

//C
app.post("/api/v1/tarefa", (req, res) => {
    const { id, descricao, data } = req.body

    if (!id || !descricao || !data) {
        res.send({ message: "Falta de informação" })
        return
    }
    //cadastrar
    db.push({ id, descricao, data, concluido: false })
    res.send({ message: "Tarefa criada!" })
})

app.get("/api/v1/tarefas", (req, res) => {
    res.send({ message: "Tarefas encontradas", db })
})

//R
app.get("/api/v1/tarefa/:id", (req, res) => {
    const id = Number(req.params.id)

    const tarefa = db.find(t => t.id === id)

    if (!tarefa) {
        res.status(404).send({ message: "Tarefa não encontrada!" })
        return
    }
    res.send({ message: "Tarefa encontrada", tarefa })
})
//U
app.put("/api/v1/tarefa/:id", (req, res) => {
    const id = Number(req.params.id)
    const { descricao, data } = req.body
    const tarefa = db.find(it => it.id === id)

    if (!tarefa) {
        res.status(404).send({ message: "Tarefa não encontrada!" })
        return
    }

    tarefa.descricao = descricao
    tarefa.data = data
    res.send({ message: "Tarefa alterada com sucesso" })
})
//D
app.delete("/api/v1/tarefa/:id", (req, res) => {
    const id = Number(req.params.id)

    const index = db.findIndex(it => it.id === id)

    if (index === -1) {
        res.status(404).send({ message: "Tarefa não encontrada" })
        return
    }

    db.splice(index, 1)

    res.send({ message: "Tarefa deletada com sucesso!" })

})


app.put("/api/v1/concluir/:id", (req, res) => {
    const id = Number(req.params.id)
    const { concluido } = req.body
    const tarefa = db.find(it => it.id === id)

    if (!tarefa) {
        res.status(404).send({ message: "Tarefa não encontrada!" })
        return
    }

    tarefa.concluido = concluido
    res.send({ message: "Tarefa alterada com sucesso" })
})

app.get("/api/v1/concluidos", (req, res) => {
    const concluido = Boolean(req.params.concluido)
    const tarefa = db.find(t => t.concluido === concluido)
    // const tarefa = db.find(Boolean)



    if (!tarefa) {
        res.status(404).send({ message: "Tarefa não encontrada!" })
        return
    }


    res.send({ message: "Tarefa encontrada", tarefa })
})



app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});