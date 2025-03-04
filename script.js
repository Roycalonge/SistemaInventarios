// script.js corregido para asegurar que el formulario de nueva categoría exista antes de usarlo

document.addEventListener("DOMContentLoaded", function() {
    const categorias = [];
    fetch("data/categorias_limpio.json")
        .then(response => response.json())
        .then(data => {
            categorias.push(...data);
        })
        .catch(error => console.error("Error cargando categorías:", error));

    document.getElementById("codigo").addEventListener("keydown", function(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            autocompletarFormulario();
        }
    });

    function autocompletarFormulario() {
        const codigoIngresado = document.getElementById("codigo").value.trim();
        const categoriaEncontrada = categorias.find(cat => cat["CÓDIGO"].toString() === codigoIngresado);

        if (categoriaEncontrada) {
            document.getElementById("referencia_interna").value = categoriaEncontrada["REFERENCIA INTERNA"] || "";
            document.getElementById("categoria").value = categoriaEncontrada["CATEGORÍA"] || "";
            document.getElementById("genero").value = categoriaEncontrada["GÉNERO"] || "";
            document.getElementById("unidad_medida").value = categoriaEncontrada["UNIDAD DE MEDIDA"] || "";
        } else {
            if (confirm("⚠️ Código no encontrado. ¿Deseas agregar una nueva categoría?")) {
                mostrarFormularioNuevaCategoria(codigoIngresado);
            }
        }
    }

    function mostrarFormularioNuevaCategoria(codigo) {
        const formNuevaCategoria = document.getElementById("formNuevaCategoria");
        if (formNuevaCategoria) {
            document.getElementById("nuevoCodigo").value = codigo;
            formNuevaCategoria.style.display = "block";
        } else {
            console.error("Error: No se encontró el formulario de nueva categoría en el DOM");
        }
    }

    const nuevaCategoriaForm = document.getElementById("nuevaCategoriaForm");
    if (nuevaCategoriaForm) {
        nuevaCategoriaForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const nuevaCategoria = {
                "CÓDIGO": document.getElementById("nuevoCodigo").value,
                "REFERENCIA INTERNA": document.getElementById("nuevaReferencia").value,
                "CATEGORÍA": document.getElementById("nuevaCategoria").value,
                "GÉNERO": document.getElementById("nuevoGenero").value,
                "UNIDAD DE MEDIDA": document.getElementById("nuevaUnidad").value,
                "DESCRIPCIÓN": document.getElementById("nuevaDescripcion").value
            };
            categorias.push(nuevaCategoria);
            alert("Nueva categoría agregada correctamente.");
            formNuevaCategoria.style.display = "none";
        });
    } else {
        console.error("Error: No se encontró el formulario de nueva categoría en el DOM");
    }
});
