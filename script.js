document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    
    // Función para cargar datos desde un archivo JSON
    function loadData(tabId, url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const contentDiv = document.getElementById(`${tabId}-content`);
                if (tabId === "categorias") {
                    contentDiv.innerHTML = `
                        ${data.map(item => `<p>${item.nombre}</p>`).join("")}
                    `;
                } else if (tabId === "inventario-productos") {
                    contentDiv.innerHTML = `
                        <table>
                            <tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>
                            ${data.map(item => `<tr><td>${item.nombre}</td><td>${item.cantidad}</td><td>$${item.precio.toFixed(2)}</td></tr>`).join("")}
                        </table>
                    `;
                } else if (tabId === "inventario-materia-prima") {
                    contentDiv.innerHTML = `
                        ${data.map(item => `<p>${item.nombre} - ${item.cantidad} unidades</p>`).join("")}
                    `;
                } else if (tabId === "movimientos") {
                    contentDiv.innerHTML = `
                        ${data.map(item => `<p>${item.tipo}: ${item.producto} - ${item.cantidad} unidades</p>`).join("")}
                    `;
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                document.getElementById(`${tabId}-content`).innerHTML = "<p>Error al cargar los datos.</p>";
            });
    }
    
    // Manejar pestañas
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            
            button.classList.add("active");
            const tabId = button.getAttribute("data-tab");
            
            // Cargar datos según la pestaña seleccionada
            if (tabId === "categorias") {
                loadData(tabId, "App/data/Categorías.json");
            } else if (tabId === "inventario-productos") {
                loadData(tabId, "App/data/Inventario_Productos_Terminados.json");
            } else if (tabId === "inventario-materia-prima") {
                loadData(tabId, "App/data/Inventario_Materia_Prima.json");
            } else if (tabId === "movimientos") {
                loadData(tabId, "App/data/Movimientos.json");
            }
            
            document.getElementById(tabId).classList.add("active");
        });
    });
    
    // Cargar datos iniciales (primera pestaña)
    loadData("categorias", "App/data/Categorías.json");
    
    // Manejar el formulario
    document.getElementById("config-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Configuración guardada correctamente.");
    });
});
