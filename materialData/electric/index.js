const Elec = [
  {
    id: 1,
    appliance: 'Réfrigérateur',
    brand: 'Samsung',
    purchaseDate: '2022-01-15',
    warrantyDate: '2023-01-15',
    expirationDate: '2030-01-15',
    energyConsumption: '200 ',
    location: 'Cuisine',
    category: 'electric',
    shop: 'ElectroWorld',
    dailyUsageHours: '24' // Par exemple, un réfrigérateur fonctionne généralement 24 heures par jour.
  },
  {
    id: 2,
    appliance: 'Lave-linge',
    brand: 'Bosch',
    purchaseDate: '2021-05-20',
    warrantyDate: '2024-05-20',
    expirationDate: '2031-05-20',
    energyConsumption: '300 ',
    location: 'Buanderie',
    category: 'electric',
    shop: 'ElectroDepot',
    dailyUsageHours: '2' // Par exemple, un lave-linge peut fonctionner pendant 2 heures par jour.
  },
  {
    id: 3,
    appliance: 'Télévision',
    brand: 'LG',
    purchaseDate: '2023-09-10',
    warrantyDate: '2026-09-10',
    expirationDate: '2033-09-10',
    energyConsumption: '100',
    location: 'Salon',
    category: 'electric',
    shop: 'MediaMarkt',
    dailyUsageHours: '6' // Par exemple, une télévision peut être utilisée pendant 6 heures par jour.
  },
  {
    id: 4,
    appliance: 'Aspirateur',
    brand: 'Dyson',
    purchaseDate: '2022-03-25',
    warrantyDate: '2025-03-25',
    expirationDate: '2032-03-25',
    energyConsumption: '600 ',
    location: 'Placard',
    category: 'electric',
    shop: 'Boulanger',
    dailyUsageHours: '1' // Par exemple, un aspirateur peut fonctionner pendant 1 heure par jour.
  },
  {
    id: 5,
    appliance: 'Four',
    brand: 'Whirlpool',
    purchaseDate: '2021-11-08',
    warrantyDate: '2024-11-08',
    expirationDate: '2031-11-08',
    energyConsumption: '1500 ',
    location: 'Cuisine',
    category: 'electric',
    shop: 'Darty',
    dailyUsageHours: 2 // Par exemple, un four peut fonctionner pendant 2 heures par jour.
  },
  {
    id: 6,
    appliance: 'Sèche-cheveux',
    brand: 'Philips',
    purchaseDate: '2023-07-12',
    warrantyDate: '2026-07-12',
    expirationDate: '2033-07-12',
    energyConsumption: '1200 ',
    location: 'Salle de bain',
    category: 'electric',
    shop: 'Fnac',
    dailyUsageHours: '0.5' // Par exemple, un sèche-cheveux peut fonctionner pendant 30 minutes par jour.
  },
  {
    id: 7,
    appliance: 'Climatiseur',
    brand: 'Mitsubishi',
    purchaseDate: '2024-02-18',
    warrantyDate: '2027-02-18',
    expirationDate: '2034-02-18',
    energyConsumption: '2500 ',
    location: 'Salon',
    category: 'electric',
    shop: 'Conforama',
    dailyUsageHours: '8' // Par exemple, un climatiseur peut fonctionner pendant 8 heures par jour.
  },
  {
    id: 8,
    appliance: 'Chauffe-eau',
    brand: 'Atlantic',
    purchaseDate: '2022-09-30',
    warrantyDate: '2025-09-30',
    expirationDate: '2032-09-30',
    energyConsumption: '3000 W',
    location: 'Cuisine',
    category: 'electric',
    shop: 'Leroy Merlin',
    dailyUsageHours: '4' // Par exemple, un chauffe-eau peut fonctionner pendant 4 heures par jour.
  },
  {
    id: 9,
    appliance: 'Micro-ondes',
    brand: 'Panasonic',
    purchaseDate: '2023-04-05',
    warrantyDate: '2026-04-05',
    expirationDate: '2033-04-05',
    energyConsumption: '1000 ',
    location: 'Cuisine',
    category: 'electric',
    shop: 'But',
    dailyUsageHours: '1' // Par exemple, un micro-ondes peut fonctionner pendant 1 heure par jour.
  },
  {
    id: 10,
    appliance: 'Aspirateur robot',
    brand: 'iRobot',
    purchaseDate: '2024-06-20',
    warrantyDate: '2027-06-20',
    expirationDate: '2034-06-20',
    energyConsumption: '50 ',
    location: 'Salon',
    category: 'electric',
    shop: 'Auchan',
    dailyUsageHours: '0.25' // Par exemple, un aspirateur robot peut fonctionner pendant 15 minutes par jour.
  }
];
export const addNewAppliance = (newAppliance) => {
  // Générez un nouvel identifiant en trouvant l'id maximum et en ajoutant 1
  const maxId = Math.max(...Elec.map((appliance) => appliance.id));
  const newId = maxId + 1;

  // Ajoutez le nouvel identifiant à l'objet newAppliance
  const applianceWithId = { ...newAppliance, id: newId };

  // Ajoutez le nouvel appareil à l'array Elec
  Elec.push(applianceWithId);
};
export default Elec;
