document.addEventListener("DOMContentLoaded", function() { 
    const tabButtons = document.querySelectorAll(".tab-button"); 
    const tabContents = document.querySelectorAll(".tab-content"); 

    // 🔹 Ajusta esta URL_BASE si usas GitHub Pages
    const URL_BASE = "https://tu-usuario.github.io/tu-repositorio/data/";

    // Función para cargar datos desde un archivo JSON
    function loadData(tabId, fileName) { 
        fetch(`${URL_BASE}${fileName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo cargar ${fileName}`);
                }
                return response.json();
            })
            .then(data => { 
                const contentDiv = document.getElementById(`${tabId}-content`); 
                
                if (tabId === "categorias") { 
                    contentDiv.innerHTML = `
                        <ul>
                            ${data.map(item => `<li>${item.CATEGORÍA}: ${item.DESCRIPCIÓN}</li>`).join("")}
                        </ul>
                    `;
                } 
                else if (tabId === "inventario-productos") { 
                    contentDiv.innerHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.map(item => `
                                    <tr>
                                        <td>${item["NOMBRE DEL PRODUCTO"]}</td>
                                        <td>${item["STOCK FINAL"] ?? 0}</td>
                                        <td>$${(item["PRECIO UNIT"] ?? 0).toFixed(2)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `;
                } 
                else if (tabId === "inventario-materia-prima") { 
                    contentDiv.innerHTML = `
                        <ul>
                            ${data.map(item => `<li>${item["NOMBRE DEL INSUMO"]} - ${item["STOCK FINAL"] ?? 0} unidades</li>`).join("")}
                        </ul>
                    `;
                } 
                else if (tabId === "movimientos") { 
                    contentDiv.innerHTML = `
                        <ul>
                            ${data.map(item => `<li>${item.tipo}: ${item.producto} - ${item.cantidad ?? 0} unidades</li>`).join("")}
                        </ul>
                    `;
                } 
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                document.getElementById(`${tabId}-content`).innerHTML = `<p style="color: red;">Error al cargar los datos: ${error.message}</p>`;
            });
    } 

    // Manejar pestañas
    tabButtons.forEach(button => { 
        button.addEventListener("click", () => { 
            tabButtons.forEach(btn => btn.classList.remove("active")); 
            tabContents.forEach(content => content.classList.remove("active")); 
            button.classList.add("active"); 
            
            const tabId = button.getAttribute("data-tab"); 
            loadData(tabId, `${tabId}.json`); // Usa el mismo nombre de archivo

            document.getElementById(tabId).classList.add("active"); 
        }); 
    }); 

    // Cargar datos iniciales (primera pestaña)
    loadData("categorias", "categorias.json"); 

    // Manejar el formulario
    document.getElementById("config-form").addEventListener("submit", function(event) { 
        event.preventDefault(); 
        alert("Configuración guardada correctamente."); 
    }); 
});
