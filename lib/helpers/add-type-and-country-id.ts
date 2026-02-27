import { Country, GeoEntity } from '@/lib/models';

export const addTypeAndCountryId = (type: 'country') => (entity: Country): GeoEntity => ({ ...entity, type, countryId: entity.id });