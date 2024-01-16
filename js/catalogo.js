import { acciones } from "./baseDatosAcciones.js";

const id_catalog = document.getElementById('catalogo');

/* function dibujarCatalogo(){
    acciones.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('row');
        card.innerHTML = `<div class="col-sm-4 mb-4 mx-3">
                            <div class="card" style="width: 12rem; max-height: 20rem;">
                                <img src="${element.imagen}" style="width: 4rem; max-height: 3rem;" class="card-img-top" alt="...">
                                <div class="card-body">                                    
                                    <h5 class="card-title">${element.Nombre}</h5>                                    
                                    <div class="row">
                                        <button id="${element.Simbolo}" name="compra" class="btn btn-success" value ="${element.PrecioMercado}" onclick="compraAccion('${element.Simbolo}')">Comprar</button>                                    
                                        <button id="${element.Simbolo}" name="vender" class="btn btn-danger" value ="${element.Simbolo}" onclick="venderAccion('${element.Simbolo}')">Vender</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        id_catalog.appendChild(card);
    });
} */
/* 
dibujarCatalogo(); */

window.addEventListener("DOMContentLoaded", ()=>{
    fetch('DataBase/data.json')
    .then((response)=>{
        return response.json();
    }).then((datos)=>{
       dibujarCatalogoLoco(datos); 
    })
    .catch((err)=>{
        console.log(err)
    })
});

const catalogoLoco = document.querySelector('#catalogoLoco');

function dibujarCatalogoLoco(datos){
    let html = "";
    datos.forEach((accion)=>{
        html += `<div class="col-sm-4 mb-4 mx-3">
        <div class="card" style="width: 12rem; max-height: 20rem;">
            <img src="${accion.imagen}" style="width: 4rem; max-height: 3rem;" class="card-img-top" alt="...">
            <div class="card-body">                                    
                <h5 class="card-title">${accion.Nombre}</h5>                                    
                <div class="row">
                    <button id="${accion.Simbolo}" name="compra" class="btn btn-success" value ="${accion.PrecioMercado}" onclick="compraAccion('${accion.Simbolo}')">Comprar</button>                                    
                    <button id="${accion.Simbolo}" name="vender" class="btn btn-danger" value ="${accion.Simbolo}" onclick="venderAccion('${accion.Simbolo}')">Vender</button>
                </div>
            </div>
        </div>
    </div>`;
    });

    
    catalogoLoco.innerHTML = html;
}