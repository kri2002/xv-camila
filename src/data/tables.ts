// data/tables.ts

export type TableData = {
  id: number;
  keyword: string; // La palabra clave para entrar
  guests: string[]; // Lista de nombres en esa mesa
};

export const tables: TableData[] = [
  {
    id: 1,
    keyword: "ETERNITY",
    guests: [
      "Juan Pérez",
      "María González",
      "Carlos López",
      "Ana Martínez",
      "Luis Rodríguez",
      "Sofia Hernandez",
      "Miguel Torres",
      "Lucía Ramírez",
      "David Flores",
      "Elena Rivera"
    ]
  },
  {
    id: 2,
    keyword: "MOONLIGHT",
    guests: [
      "Pedro Sánchez",
      "Laura Díaz",
      "Jorge Vásquez",
      "Carmen Ruiz",
      "Manuel Castro",
      "Patricia Ortiz",
      "Roberto Silva",
      "Teresa Morales",
      "Fernando Herrera",
      "Isabel Medina"
    ]
  },
  {
    id: 3,
    keyword: "STARDUST",
    guests: [
      "Ricardo Vargas",
      "Adriana Castillo",
      "Daniel Romero",
      "Verónica Mendoza",
      "Gabriel Aguilar",
      "Rosa Delgado",
      "Antonio Peña",
      "Marta Navarro",
      "Francisco Rivas",
      "Paula Cordero"
    ]
  },
  // ... Agrega más mesas aquí ...
];

// Helper para buscar invitados
export const searchGuest = (query: string) => {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase();
  
  // Aplanamos la lista para buscar nombre por nombre
  const allMatches: { name: string; tableId: number }[] = [];
  
  tables.forEach(table => {
    table.guests.forEach(guest => {
      if (guest.toLowerCase().includes(normalizedQuery)) {
        allMatches.push({ name: guest, tableId: table.id });
      }
    });
  });

  return allMatches;
};

// Helper para obtener los datos completos de una mesa por ID
export const getTableById = (id: number) => {
  return tables.find(t => t.id === id);
};