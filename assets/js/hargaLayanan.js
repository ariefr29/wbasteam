/**
 * Vehicle Price List Component
 * A modular system for displaying vehicle service prices
 */
class VehiclePriceList {
  constructor(options) {
    // Default configuration
    this.config = {
      containerId: 'price-list',
      title: 'Vehicle Price List',
      defaultVehicleType: '',
      vehicleTypes: [],
      vehicleLabels: {},
      cssClasses: {
        container: 'bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 max-w-4xl mx-auto',
        title: 'text-xl font-bold text-center py-4 bg-gray-50',
        tabContainer: 'grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 sm:p-6 border-b border-gray-100 justify-center ',
        activeTab: 'bg-carwash-blue text-white shadow-md',
        inactiveTab: 'bg-carwash-lightblue/50 text-carwash-darkgray hover:bg-carwash-lightblue',
        button: 'py-3 px-4 rounded-xl transition-all duration-300 capitalize font-medium text-center',
        tableHeader: 'bg-gray-50',
        tableRow: 'border-t border-gray-100 transition-colors duration-300 hover:bg-gray-50',
        popularService: 'bg-carwash-lightblue/20',
        popularBadge: 'ml-2 text-xs bg-carwash-blue text-white px-2 py-0.5 rounded-full',
        footer: 'p-6 bg-gray-50 border-t border-gray-100',
        footerText: 'text-sm text-carwash-darkgray'
      }
    };
    
    // Override defaults with provided options
    this.config = {...this.config, ...options};
    
    // Set default vehicle type if not specified
    if (!this.config.defaultVehicleType && this.config.vehicleTypes.length > 0) {
      this.config.defaultVehicleType = this.config.vehicleTypes[0];
    }
    
    // Current state
    this.currentVehicleType = this.config.defaultVehicleType;
    
    // Initialize the component
    this.initialize();
  }
  
  initialize() {
    // Create container element
    this.createContainer();
    
    // Create vehicle type tabs
    this.createVehicleTabs();
    
    // Update price table with default vehicle type
    this.updatePriceTable(this.currentVehicleType);
  }
  
  createContainer() {
    const container = document.getElementById(this.config.containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div class="${this.config.cssClasses.container}">
        ${this.config.title ? `<div class="${this.config.cssClasses.title}">${this.config.title}</div>` : ''}
        <div class="${this.config.cssClasses.tabContainer}" id="${this.config.containerId}-tabs"></div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="${this.config.cssClasses.tableHeader}">
                <th class="py-4 px-6 text-left text-sm font-semibold text-carwash-darkgray">Layanan</th>
                <th class="py-4 px-6 text-right text-sm font-semibold text-carwash-darkgray">Harga</th>
              </tr>
            </thead>
            <tbody id="${this.config.containerId}-table-body">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
        <div class="${this.config.cssClasses.footer}">
          <p class="${this.config.cssClasses.footerText}">
            * Harga di atas bersifat tetap dan pasti. Jika menemukan perbedaan harga saat mencuci, hubungi kami untuk komplain dan garansi.
          </p>
        </div>
      </div>
    `;
  }
  
  createVehicleTabs() {
    const tabsContainer = document.getElementById(`${this.config.containerId}-tabs`);
    if (!tabsContainer) return;
    
    this.config.vehicleTypes.forEach(type => {
      const button = document.createElement('button');
      button.id = `${this.config.containerId}-${type}-tab`;
      button.className = `${this.config.cssClasses.button} ${
        type === this.currentVehicleType 
          ? this.config.cssClasses.activeTab 
          : this.config.cssClasses.inactiveTab
      }`;
      
      // Use bind to ensure 'this' refers to the class instance
      button.onclick = this.changeVehicleType.bind(this, type);
      button.textContent = this.config.vehicleLabels[type] || type;
      
      tabsContainer.appendChild(button);
    });
  }
  
  changeVehicleType(type) {
    // Update active state for buttons
    this.config.vehicleTypes.forEach(vehicleType => {
      const tab = document.getElementById(`${this.config.containerId}-${vehicleType}-tab`);
      if (!tab) return;
      
      if (vehicleType === type) {
        tab.className = `${this.config.cssClasses.button} ${this.config.cssClasses.activeTab}`;
      } else {
        tab.className = `${this.config.cssClasses.button} ${this.config.cssClasses.inactiveTab}`;
      }
    });
    
    // Update current type
    this.currentVehicleType = type;
    
    // Update table
    this.updatePriceTable(type);
  }
  
  createServiceRow(item, vehicleType) {
    const row = document.createElement('tr');
    row.className = `${this.config.cssClasses.tableRow} ${item.popular ? this.config.cssClasses.popularService : ''}`;
    
    row.innerHTML = `
      <td class="py-4 px-6">
        <div class="flex items-start">
          <div>
            <div class="flex items-center">
              <span class="font-medium text-carwash-black">${item.service}</span>
              ${item.popular ? `<span class="${this.config.cssClasses.popularBadge}">Popular</span>` : ''}
            </div>
            ${item.description ? `<p class="text-sm text-carwash-darkgray mt-1">${item.description}</p>` : ''}
          </div>
        </div>
      </td>
      <td class="py-4 px-6 text-right font-semibold">
        Rp${item.prices[vehicleType].toFixed(3)}
      </td>
    `;
    
    return row;
  }
  
  updatePriceTable(vehicleType) {
    const tableBody = document.getElementById(`${this.config.containerId}-table-body`);
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    this.config.priceData.forEach(item => {
      const row = this.createServiceRow(item, vehicleType);
      tableBody.appendChild(row);
    });
  }
}

// Car price data
const carPriceData = [
  {
    service: 'Cuci Premium',
    prices: { mobilbesar: 50, mobilkecil: 40 },
    description: 'Pembersihan eksterior menyeluruh, vakum dan cuci karpet dalam',
    popular: true
  },
  {
    service: 'Full Salon (Eksterior + Interior)',
    prices: { mobilbesar: 550, mobilkecil: 450 },
    description: 'Paket lengkap untuk kendaraan yang bersih maksimal, luar dan dalam, dengan hasil terbaik.'
  }
];

// Motorcycle price data
const motorcyclePriceData = [
  {
    service: 'Cuci Premium',
    prices: { motorkecil: 15, motorsedang: 18, motorbesar: 20 },
    description: 'Cuci dengan shampo premium + semir ban',
    popular: true
  },
  {
    service: 'Cuci Rangka',
    prices: { motorkecil: 200, motorsedang: 250, motorbesar: 300 },
    description: 'Pembersihan detail pada bagian dalam motor khususnya rangka dan mesin'
  },
  {
    service: 'Full Detailing',
    prices: { motorkecil: 350, motorsedang: 400, motorbesar: 450 },
    description: 'Detailing lengkap mencakup cuci luar, pembersihan rangka & mesin, poles bodi, dan proteksi cat.'
  }
];

// Initialize car price list
const carPriceList = new VehiclePriceList({
  containerId: 'car-price-list',
  title: 'Layanan Cuci Mobil & Detailing',
  defaultVehicleType: 'mobilbesar',
  vehicleTypes: ['mobilkecil', 'mobilbesar'],
  vehicleLabels: {
    mobilkecil: 'Mobil Kecil',
    mobilbesar: 'Mobil Besar',
  },
  priceData: carPriceData
});

// Initialize motorcycle price list
const motorcyclePriceList = new VehiclePriceList({
  containerId: 'motorcycle-price-list',
  title: 'Layanan Cuci Motor & Detailing',
  defaultVehicleType: 'motorkecil',
  vehicleTypes: ['motorkecil', 'motorsedang', 'motorbesar'],
  vehicleLabels: {
    motorkecil: 'Motor Kecil',
    motorsedang: 'Motor Sedang',
    motorbesar: 'Motor Besar'
  },
  priceData: motorcyclePriceData
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Components are already initialized when instantiated
});