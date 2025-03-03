document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    function loadData(tabId, data) {
        const contentDiv = document.getElementById(`${tabId}-content`);
        if (!contentDiv) return;

        if (tabId === "categorias") {
            contentDiv.innerHTML = data.map(item => `<p>${item.nombre}</p>`).join("");
        } else if (tabId === "inventario-productos") {
            contentDiv.innerHTML = `<table>
                <tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>
                ${data.map(item => `<tr><td>${item.nombre}</td><td>${item.cantidad}</td><td>$${item.precio.toFixed(2)}</td></tr>`).join("")}
            </table>`;
        } else if (tabId === "inventario-materia-prima") {
            contentDiv.innerHTML = data.map(item => `<p>${item.nombre} - ${item.cantidad} unidades</p>`).join("");
        } else if (tabId === "movimientos") {
            contentDiv.innerHTML = data.map(item => `<p>${item.tipo}: ${item.producto} - ${item.cantidad} unidades</p>`).join("");
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            const tabId = button.getAttribute("data-tab");

            if (tabId === "categorias") {
                loadData(tabId, categorias);
            } else if (tabId === "inventario-productos") {
                loadData(tabId, inventarioProductos);
            } else if (tabId === "inventario-materia-prima") {
                loadData(tabId, inventarioMateriaPrima);
            } else if (tabId === "movimientos") {
                loadData(tabId, movimientos);
            }

            document.getElementById(tabId).classList.add("active");
        });
    });

    // Cargar la primera pestaña al inicio
    loadData("categorias", categorias);
});
