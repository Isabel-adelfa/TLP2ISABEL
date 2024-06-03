let pnome =document.querySelector("#pnome")
let unome =document.querySelector("#unome")
let senha =document.querySelector("#psenha")
let email =document.querySelector("#email")
let confsenha =document.querySelector("#confsenha")

// funcão para validar os dados do usuario pelo click

    send.addEventlistener("click", (e) =>{
        e.preventDefault()
        enviarDados()
    })

    function enviarDados(){
        let pnomevalue =pnome.value
        let unomevalue =pnome.value
        let senhavalue =senha.value
        let emailvalue =pnome.value
         let confsenhavalue =confsenha.value

            try{
                fetch ("http://localhost:3939/formulario",{
                  method: "POST",
                headers:{
                "content-Type": "application/json"
            },

            body:JSON.stringify({
                "pnome": pnomevalue,
                "unome":unomevalue,
                "email":emailvalue,
                "senha":senhavalue,
                "confsenha": confsenhavalue
            })
        })

        return
    }catch(error){
        console.log(error)
    }
    finally{
        pnome.value=""
        unome.value=""
        email.value=""
        senha.value=""
        conf.senha=""

    }

}