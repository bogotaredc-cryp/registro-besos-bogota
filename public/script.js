const API = "/api/check-document";

const documento = document.getElementById("documento");
const verificar = document.getElementById("verificar");
const continuar = document.getElementById("continuar");
const mensaje = document.getElementById("mensaje");

// Google Form
const FORM =
"https://docs.google.com/forms/d/e/1FAIpQLScQ4-WuN3ZyCjQ2Upw1X8Rs2zSk6ZivPwWINJSV5XT4bRsI8g/viewform?usp=pp_url";

const DOCUMENTO_ENTRY = "1830107167";

verificar.addEventListener("click", verificarDocumento);

async function verificarDocumento(){

    const doc = documento.value.trim();

    continuar.style.display = "none";

    if(doc===""){

        mensaje.className="error";
        mensaje.innerHTML="Ingrese su documento.";

        return;

    }

    verificar.disabled=true;

    mensaje.className="loading";
    mensaje.innerHTML="Consultando información...";

    try{

        const response = await fetch(
            `${API}?documento=${encodeURIComponent(doc)}`
        );

        const data = await response.json();

        if(!data.success){

            throw new Error(data.message);

        }

        if(data.exists){

            mensaje.className="error";
            mensaje.innerHTML="❌ Este documento ya está en la base de datos. No necesitas registrarte.";

            continuar.style.display="none";

        }else{

            mensaje.className="success";
            mensaje.innerHTML="✅ Ups, aún no estás en la base de datos. Continúa con el registro.";

            continuar.style.display="block";

        }

    }catch(error){

        console.error(error);

        mensaje.className="error";
        mensaje.innerHTML="No fue posible validar el documento.";

    }

    verificar.disabled=false;

}

continuar.addEventListener("click",()=>{

    const doc=documento.value.trim();

    window.location.href=
    `${FORM}&entry.${DOCUMENTO_ENTRY}=${encodeURIComponent(doc)}`;

});
