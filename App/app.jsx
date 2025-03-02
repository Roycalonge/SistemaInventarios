import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define tab content in an object for better scalability
const tabContent = {
  "Categorías": <p>Contenido de Categorías</p>,
  "Inventario Productos Terminados": <p>Contenido de Inventario Productos Terminados</p>,
  "Inventario Materia Prima": <p>Contenido de Inventario Materia Prima</p>,
  "Movimientos": <p>Contenido de Movimientos</p>,
  "Configuración": <p>Opciones de Configuración</p>,
  "Ayuda": <p>Información de Ayuda</p>,
};

export default function App() {
  const tabs = Object.keys(tabContent); // Get tab names from the tabContent object
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          {tabContent[activeTab]}
        </CardContent>
      </Card>
    </div>
  );
}