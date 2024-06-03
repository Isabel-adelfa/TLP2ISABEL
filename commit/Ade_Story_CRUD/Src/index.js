import cors from "cors"
import {db} from "./db.js"
import express, {json} from "express"

    // inicialisaçao do express
    const app = express()
    // vamos usar o json (que é um formato de dados, leve e facil que troca informaçoes entre varias linguaguens)
    app.use(json())
    //especificar que vamos compartilhar aquivos com origens diferentes
    app.use(cors())

    
    // read -- leitura dos dados

    //Usuarios

    //Obter todos os usuários
    app.get("/usuarios",(req, res)=>{
         let sql = "select * from usuarios"
         db.query(sql,(err, result)=>{
            if(err) return console.log("Erro na leitura: " + err)
            res.json(result)
        })
    })

    //Obter um usuários
    app.get("/usuarios/:id",(req, res)=>{
        let sql = `select * from usuarios where idusuario = '${req.params.id}'`
        db.query(sql,(err, result)=>{
           if(err) return console.log("Erro na leitura: " + err)
           res.json(result[0])
       })
   })

   //Adicionar um usuários
   app.post("/usuarios", (req, res)=>{

    let sql = `insert into usuarios values (default, "'${req.body.nome}'", "'${req.body.email}'",  "'${req.body.senha}'")`
    db.query(sql,(err, result)=>{
       if(err) return console.log("Erro na leitura: " + err)
       res.json(result)
   })

   })

   app.post("/usuarios/login", (req, res)=>{

    let sql = `select idusuario from usuarios where email = '${req.body.email}' and password = '${req.body.senha}'`;

    db.query(sql,(err, result)=>{
       if(err) return console.log("Erro na leitura: " + err)
        console.log(result[0].idusuario)
       res.json(result[0].idusuario)
   })

   })

   //Actualizar um usuários
   app.put("/usuarios/:id",(req, res)=>{

    let sql = `update usuarios set  
            pnome = "${req.body.nome}", 
            email = "${req.body.email}", 
            password =  "${req.body.senha}"
            where idusuario = ${req.params.id}`

    db.query(sql,(err, result)=>{
       if(err) return console.log("Erro na leitura: " + err)
       res.json(result)
    })

   })

   app.delete("/usuarios/:id",(req, res)=>{

    let sql = `delete from usuarios where idusuario = ${req.params.id}`

    db.query(sql,(err, result)=>{
       if(err) return console.log("Erro na leitura: " + err)
       res.json(result)
    })
    
   })


  /*  app.get("/",(req, res)=>{
       let sql = "select * from logins"
        db.query(sql,(err, result)=>{
            if(err) return console.log("Erro na leitura!")
            res.json(result)
         })
    })


    app.get("/",(req, res)=>{
        let sql = "select * from playlists"
        db.query(sql,(err, result)=>{
            if(err) return console.log("Erro na leitura!")
            res.json(result)
        })
    })
    app.get("/",(req, res)=>{
        let sql = "select * from comentarios"
        db.query(sql,(err, result)=>{
            if(err) return console.log("Erro na leitura dos comentarios!")
            res.json(result)
        })
    })
*/


    //create -- criar novos usuarios
    app.post("/iserirlog",(req,res)=>{
        const {pnome, password} = req.body
   
         let sql = `insert into logins values (default, '${pnome}', '${password}')`
        db.query(sql, (err)=>{
            if(err) return console.log("Erro na incersao")
            console.log("sucesso ao inserir!")
         })
    })


    app.post("/iserirplay",(req,res)=>{
         const {pnome,genero} = req.body

         let sql = `insert into playlists values (default, '${pnome}', '${genero}')`
        db.query(sql, (err)=>{
            if(err) return console.log("Erro na incersao")
            console.log("sucesso ao inserir!")
         })
    })

    app.post("/iserircad",(req,res)=>{
        const {pnome} = req.body
        const{unome}=req.body
        const{email}=req.body
        const{senha}=req.body
        const{confsenha}=req.body
        let sql = `insert into cadastros values (default, '${pnome}', '${unome}', '${email}', '${senha}', '${confsenha}')`
        db.query(sql, (err)=>{
            if(err) return console.log("Erro na incersao")
            console.log("sucesso ao inserir!")
        })
    })
    app.post("/iserircom",(req,res)=>{
        const {pnome, password} = req.body
   
         let sql = `insert into comentarios values (default, '${comentario}')`
        db.query(sql, (err)=>{
            if(err) return console.log("Erro ao enviar comentario!")
            console.log("sucesso ao inserir comentario !")
         })
    })



    // update -- actualizar os nomes
    

    app.put("/atualizarlog/:idlog",(req, res)=>{
       const{novopnome}=req.body 
       const{password}=req.body
       const{idlog}=req.params
        let sql = `update logins set pnome='${novopnome}', password='${password}' where idlog=${idlog}`
        db.query(sql, (err)=>{
              if(err) return console.log("Erro ao atualizar")
                console.log("sucesso ao atualizar!")
       })
    })

    app.put("/atualizarplay/:idplay",(req, res)=>{
        const {novopnome} = req.body
         const{genero}=req.body
         const{idplay}=req.params
        let sql = `update playlists set pnome='${novopnome}', genero='${genero}' where idplay=${idplay}`
        db.query(sql, (err)=>{
             if(err) return console.log("Erro na atualizacao")
            console.log("sucesso ao atualizar!")
        })
    })



    app.put("/atualizarcad/:idcad",(req, res)=>{
        const {novopnome} = req.body
        const{novounome}=req.body
        const{novoemail}=req.body
        const{novosenha}=req.body
        const{novoconfsenha}=req.body
        const{idcad}=req.params
    
        let sql = `update cadastros set pnome='${novopnome}', unome='${novounome}', email='${novoemail}', senha='${novosenha}', confsenha='${novoconfsenha}' where idcad=${idcad}`
        db.query(sql, (err)=>{
             if(err) return console.log("Erro na atualizacao")
            console.log("sucesso ao atualizar!")
        })
    })
    app.put("/atualizarcad/:idcoment",(req, res)=>{
        const {novocomentario} = req.body
    
        let sql = `update cadastros set pnome='${novocomentario}' `
        db.query(sql, (err)=>{
             if(err) return console.log("Erro na atualizacao do comentario ")
            console.log("sucesso ao atualizar o comentario!")
        })
    })



    // delete -- apagar um nome

    app.delete("/apagarlog/:idlog", (req, res)=>{
        const {idlog} = req.params
        let sql = `delete from logins where idlog=${idlog}`
       db.query(sql, (err)=>{
            if(err) return console.log("Erro ao apagar")
           console.log("sucesso ao apagar!")
       })
   })



    app.delete("/apagarcad/:idcad", (req, res)=>{
        const {idcad} = req.params
        let sql = `delete from cadastros where idlog=${idcad}`
        db.query(sql, (err)=>{
             if(err) return console.log("Erro ao apagar conta")
            console.log("sucesso ao apagar a conta!")
         })
    })


    app.delete("/apagarplay/:idplay", (req, res)=>{
        const {idplay} = req.params
        let sql = `delete from playlists where idplay=${idplay}`
        db.query(sql, (err)=>{
             if(err) return console.log("Erro ao apagar playlist")
            console.log("sucesso ao apagar playlist!")
         })
    })

    app.delete("/apagarcoment/:idcoment", (req, res)=>{
        const {idcoment} = req.params
        let sql = `delete from comentarios where idcoment=${idcoment}`
       db.query(sql, (err)=>{
            if(err) return console.log("Erro ao apagar comentario")
           console.log("sucesso ao apagar comentario!")
       })
   })

    app.post("/formulario",(req,res)=>{
        const{pnome,unome,email,senha,confsenha}=req.body;
        const sql= ` INSERT INTO cadastros(idcad, pnome, unome, email, senha, confsenha) 
        VALUES (DEFAULT, '${pnome}',  '${unome}', '${email}' ,'${senha}','${confsenha}' );`
        db.query(sql,(err,result)=>{
            if(err) return console.log("Erro no cadastro")
                console.log("usuario cadastrado ")

        })
        res.redirect('/formulario')
    })




app.listen(3939, console.log("servidor rodando!"))