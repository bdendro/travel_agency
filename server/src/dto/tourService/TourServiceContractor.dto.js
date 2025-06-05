import TourServiceDTO from './TourService.dto.js';
import ContractorDTO from '../contractor/Contractor.dto.js';

export class BaseTourServiceWithContractorDTO extends TourServiceDTO {
  constructor({ id, description, status, price, isMandatory, type }, contractor) {
    super({ id, description, status, price, isMandatory, type });
    this.contractor = new ContractorDTO(contractor);
  }
}

export class TourServiceWithContractorDTO extends BaseTourServiceWithContractorDTO {
  constructor({ id, description, status, price, isMandatory, type, tourId }, contractor) {
    super({ id, description, status, price, isMandatory, type }, contractor);
    this.tourId = tourId;
  }
}
