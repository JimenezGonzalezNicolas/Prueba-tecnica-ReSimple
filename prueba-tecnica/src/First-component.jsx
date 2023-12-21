import React, { useState } from "react";
import { FaChevronDown } from 'react-icons/fa';
import "./App.css";
import ExcelReader from "./Excel-reader";

const FirstComponent = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSubItem, setSelectedSubItem] = useState({});
    const [workersData, setWorkersData] = useState(null);

    const data = {
        EMPRESAS: [
            {
                ID_EMPRESA: 1,
                NOMBRE_EMPRESA: "Grupo Dinámico Alfa",
                AREAS: [
                    { "ID_AREA": "A1", "NOMBRE_AREA": "Finanzas" },
                    { "ID_AREA": "A2", "NOMBRE_AREA": "Marketing" },
                    { "ID_AREA": "A3", "NOMBRE_AREA": "Operaciones" },
                    { "ID_AREA": "A4", "NOMBRE_AREA": "RRHH" }
                ]
            },
            {
                ID_EMPRESA: 2,
                NOMBRE_EMPRESA: "Soluciones Innovadoras Gamma",
                AREAS: [
                    { "ID_AREA": "A1", "NOMBRE_AREA": "Recursos Humanos" },
                    { "ID_AREA": "A2", "NOMBRE_AREA": "IT" },
                    { "ID_AREA": "A3", "NOMBRE_AREA": "Legal" },
                    { "ID_AREA": "A4", "NOMBRE_AREA": "Comunicaciones" }
                ]
            },
            {
                ID_EMPRESA: 3,
                NOMBRE_EMPRESA: "Tecnologías Avanzadas Omega",
                AREAS: [
                    { "ID_AREA": "A1", "NOMBRE_AREA": "Investigación y Desarrollo" },
                    { "ID_AREA": "A2", "NOMBRE_AREA": "Ventas" },
                    { "ID_AREA": "A3", "NOMBRE_AREA": "Atención al Cliente" },
                    { "ID_AREA": "A4", "NOMBRE_AREA": "Logística" }
                ]
            },
            {
                ID_EMPRESA: 4,
                NOMBRE_EMPRESA: "Conexiones Estratégicas Beta",
                AREAS: [
                    { "ID_AREA": "A1", "NOMBRE_AREA": "Desarrollo de Producto" },
                    { "ID_AREA": "A2", "NOMBRE_AREA": "Servicio al Cliente" }
                ]
            },
            {
                ID_EMPRESA: 5,
                NOMBRE_EMPRESA: "Visión Global Zeta",
                AREAS: [
                    { "ID_AREA": "A1", "NOMBRE_AREA": "Investigación de Mercado" },
                    { "ID_AREA": "A2", "NOMBRE_AREA": "Publicidad" }
                ]
            }
        ]
    }
    const empresas = data.EMPRESAS;


    const toggleItem = (index) => {
        setSelectedItem(index === selectedItem ? null : index);
        setSelectedSubItem(null);
    };

    const toggleSubItem = (areaIndex) => {
        setSelectedSubItem(areaIndex === selectedSubItem ? null : areaIndex);
    };

    const handleDataLoaded = (excelData) => {
        console.log('Datos leídos correctamente:', excelData);
        setWorkersData(excelData);
    };

    const getWorkersByArea = (companyId, areaId) => {
        if (!workersData) {
            return [];
        }

        return workersData.filter(
            (worker) => worker.ID_EMPRESA === companyId && worker.ID_AREA === areaId
        );
    };

    const workersByArea = getWorkersByArea(
        empresas[selectedItem]?.ID_EMPRESA,
        empresas[selectedItem]?.AREAS[selectedSubItem]?.ID_AREA
    );
    return (
        <>
            <div className="flex justify-center bg-green-500 p-4">
                <p className="font-extralight text-white">Prueba técnica React Nicolás Jiménez</p>
            </div>

            <div className="flex flex-col items-center h-screen bg-gray-400 py-4">
                <div className="">
                    <ExcelReader onDataLoaded={handleDataLoaded} />
                </div>
                {empresas.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg w-1/2 cursor-pointer mb-2 transition-item">
                        <div
                            className={`flex  justify-center items-center bg-white 
                            h-flex lg:h-9 text-black rounded-lg p-4 hover:bg-gray-100 
                            ${index === selectedItem ? "bg-gray-100" : ""}`}
                            onClick={() => toggleItem(index)}
                        >

                            <div className="flex w-1/2 justify-start">
                                {item.NOMBRE_EMPRESA}
                            </div>

                            <div className="flex w-1/2 justify-end">
                                <FaChevronDown className={` ${index === selectedItem ? "rotate-chevron" : "classic-chevron"}`}/>
                            </div>

                        </div>
                        <div>
                            {selectedItem === index && (
                                <div className="flex flex-col items-center justify-center bg-white w-full py-2 px-4 rounded-lg transition-item">
                                    {item.AREAS.map((area, areaIndex) => (
                                        <div
                                            key={areaIndex}
                                            className={`flex flex-col items-center justify-center bg-white w-full py-2 rounded-lg ${areaIndex === selectedSubItem ? "bg-gray-100" : ""}`}
                                            onClick={() => toggleSubItem(areaIndex)}
                                        >
                                            <div className="flex w-full">
                                                <div className="flex w-1/2 justify-start">
                                                    {area.NOMBRE_AREA}
                                                </div>

                                                <div className="flex w-1/2 justify-end">
                                                    <FaChevronDown className={` ${areaIndex === selectedSubItem ? "rotate-chevron" : "classic-chevron"}`}/>
                                                </div>
                                            </div>

                                            {selectedSubItem === areaIndex && (
                                                <div className="flex flex-col items-center justify-center bg-white w-full py-2 px-8 overflow-x-auto lg:px-4 xl:px-4 ">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr className="border-solid border-2 border-grey-500">
                                                            <th className="px-2 text-black font-light">NOMBRE</th>
                                                            <th className="px-2 text-black font-light">RUT</th>
                                                            <th className="px-2 text-black font-light">EDAD</th>
                                                            <th className="px-2 text-black font-light">PROFESIÓN</th>
                                                            <th className="px-2 text-black font-light">CARGO</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {workersByArea.map((worker, index) => (
                                                            <tr key={index} className="border-solid border-2 border-grey-500">
                                                                <td className="text-center px-2 py-1 text-black font-light">
                                                                    {worker.NOMBRE_TRABAJADOR}
                                                                </td>
                                                                <td className="text-center px-2 py-1 text-black font-light">
                                                                    {worker.RUT_TRABAJADOR}
                                                                </td>
                                                                <td className="text-center px-2 py-1 text-black font-light">
                                                                    {worker.EDAD}
                                                                </td>
                                                                <td className="text-center px-2 py-1 text-black font-light">
                                                                    {worker.PROFESION}
                                                                </td>
                                                                <td className="text-center px-2 py-1 text-black font-light">
                                                                    {worker.CARGO}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FirstComponent;